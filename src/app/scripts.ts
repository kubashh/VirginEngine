import fs from "fs";
import { buildCoreBuild } from "../../core/buildCoreBuild";

const virginEngineVersion = JSON.stringify((await Bun.file(`./package.json`).json()).version);

await Bun.$`bun check src`;
await buildCoreBuild(virginEngineVersion);
await updateVEVersionHtml();

if (process.argv.includes(`--dev`)) {
  await dev();
} else if (process.argv.includes(`--build`)) {
  await build();
}

async function updateVEVersionHtml() {
  const htmlFile = Bun.file(`./src/app/index.html`);
  let htmlText = await htmlFile.text();

  htmlText = htmlText.replace(
    /<title>.*?<\/title>/i,
    `<title>VirginEngine v${virginEngineVersion.slice(1, -1)}</title>`,
  );

  await Bun.write(`./src/app/indexUpdated.html`, htmlText);
}

async function dev() {
  const html = await import("./indexUpdated.html");

  fs.watch(`core`, { recursive: true }, async () => {
    await Bun.$`bun core/buildBuild.ts`;
  });

  Bun.serve({
    routes: {
      "/": html.default,
    },
    development: { hmr: true },
  });
}

async function build() {
  const plugin = (await import("bun-plugin-tailwind")).default;
  const mdStylesPlugin = (await import("./mdStylesPlugin")).default;

  const config: Bun.BuildConfig = {
    entrypoints: [`./src/app/indexUpdated.html`],
    outdir: `dist`,
    naming: `index.html`,
    plugins: [plugin, mdStylesPlugin],
    minify: true,
    target: `browser`,
    define: {
      "process.env.NODE_ENV": `"production"`,
    },
  };

  if (process.argv.includes(`--compile`)) {
    Object.assign(config, { compile: true, naming: `VirginEngine-${virginEngineVersion}.html` });
  }

  // cleaning
  fs.rmSync(`dist`, {
    recursive: true,
    force: true,
  });

  // build all the HTML files
  const { outputs } = await Bun.build(config);

  const htmlArtifact = outputs.find((a) => a.path.endsWith(`.html`))!;

  let html = await htmlArtifact.text();

  // bun makes empty script tag and left comments, so it can be removed to reduce the size of the output file
  html = removeScriptsAndComments(html);

  // bun add crossorigin attribute
  html = removeCrossorgin(html);

  // bun minify css and js but not html, so we need to minify it manually
  html = minifyHtmlSyntax(html);

  // bundle css, because with html is steel small. in 2G (EDGE) is theoretically under one second
  const cssArtefacts = outputs.filter((a) => a.path.endsWith(`.css`));
  for (const cssArtefact of cssArtefacts) {
    const cssText = await cssArtefact.text();
    const cssPath = `./${cssArtefact.path.split(`/`).at(-1)}`;
    const regex = new RegExp(`<link rel="stylesheet"href="${cssPath}"\\/?>`);
    html = html.replace(regex, `<style>${cssText}</style>`);
    await Bun.file(cssArtefact.path).delete();
  }

  await Bun.write(htmlArtifact.path, html);
}

function removeScriptsAndComments(text: string) {
  return text
    .replaceAll(`<script></script>`, ``) // remove empty script
    .replaceAll(`<script type="module"></script>`, ``) // remove empty script
    .replaceAll(/<!--[\s\S]*?-->/g, ``);
}

// function minified html skipping <script> tag content
function minifyHtmlSyntax(text: string) {
  const scripts: string[] = [];
  const token = (i: number) => `__SCRIPT_BLOCK_${i}__`;

  // extract all script blocks (handles attributes too)
  const withoutScripts = text.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, (m) => {
    const i = scripts.length;
    scripts.push(m); // keep original
    return token(i);
  });

  // minify html
  const minified = withoutScripts
    .replaceAll(/\/\*[\s\S]*?\*\//g, ``) // remove comments
    .replaceAll(`\n`, ` `)
    .replaceAll(/\s{2,}/g, ` `)
    .replaceAll(/ > | >|> /g, `>`)
    .replaceAll(/ < | <|< /g, `<`)
    .replaceAll(/ ; | ;|; /g, `;`)
    .replaceAll(/ { | {|{ /g, `{`)
    .replaceAll(/ } | }|} /g, `}`)
    .replaceAll(/ " | "|" /g, `"`)
    .replaceAll(/ , | ,|, /g, `,`);
  // .replaceAll(`: `, `:`); // color: red; => color:red;

  // restore script blocks
  return minified
    .replace(/__SCRIPT_BLOCK_(\d+)__/g, (_, n) => scripts[n])
    .replace(/;\n<\/script|;<\/script|\n<\/script/, `</script`); // remove ';' if exists and '\n'
}

// it may brake scripts
// TODO make it works only in <tag art1 crossorigin />
function removeCrossorgin(text: string) {
  return text.replaceAll(/\s+crossorigin/g, ``);
}
