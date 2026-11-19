import fs from "fs";
import { version as virginEngineVersion } from "../../package.json";
import { buildCoreBuild } from "../../core/buildCoreBuild";
import { minifyCss } from "./minifyCss";

await Bun.$`bun check core src`;
await Bun.$`bun fmt core src package.json`;
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
    `<title>VirginEngine v${virginEngineVersion}</title>`,
  );

  await Bun.write(`./src/app/indexUpdated.html`, htmlText);
}

async function dev() {
  const html = await import("./indexUpdated.html");

  fs.watch(`core`, { recursive: true }, async () => {
    await Bun.$`bun fmt core`;
    await buildCoreBuild(virginEngineVersion);
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

  if (config.compile !== true) {
    // bundle css, because with html is steel small. in 2G (EDGE) is theoretically under one second
    const cssArtefacts = outputs.filter((a) => a.path.endsWith(`.css`));
    for (const cssArtefact of cssArtefacts) {
      let cssText = await cssArtefact.text();

      const cssPath = `./${cssArtefact.path.split(`/`).at(-1)}`;
      const regex = new RegExp(`<link rel="stylesheet"href="${cssPath}"\\/?>`);

      html = html.replace(regex, `<style>${cssText}</style>`);
      await Bun.file(cssArtefact.path).delete();
    }
  }

  // minify css
  let index = html.indexOf(`<style>`) + `<style>`.length;
  if (index > 0) {
    const indexEnd = html.indexOf(`</style>`, index);
    let cssText = html.slice(index, indexEnd);
    cssText = minifyCss(cssText);
    html = html.slice(0, index) + cssText + html.slice(indexEnd);
  }

  await Bun.write(htmlArtifact.path, html);

  const printPaths: string[] = outputs.map((a) => a.path).filter((path) => !path.endsWith(`.css`));
  printSize(printPaths);
}

async function printSize(paths: string[]) {
  const compile: boolean = !paths.find((p) => p.endsWith(`.js`));
  let sizeHtml = 0;
  let sizeCss = 0;
  let sizeJs = 0;
  let sizeMedia = 0;
  let sizeTotalControl = 0;

  for (const path of paths) {
    const file = Bun.file(path);
    sizeTotalControl += file.size;
    if (path.endsWith(`.html`)) {
      const html = await file.text();

      let newSizeMedia = 0;
      // count icon string as media
      const iconMatch = html.match(/href="data:image.*?"/);
      if (iconMatch) {
        const iconStr = iconMatch[0].slice(`href="`.length, -`"`.length);
        newSizeMedia += stringBytesLength(iconStr);
      }

      // count css size, always one element
      let index = html.indexOf(`<style>`) + `<style>`.length;
      if (index >= 0) {
        const indexEnd = html.indexOf(`</style>`, index);
        const cssText = html.slice(index, indexEnd);
        sizeCss = stringBytesLength(cssText);
      } else {
        throw new Error(`No css in html!`);
      }

      // count script size, always module and one element
      let newSizeJs = 0;
      let indexJs = html.indexOf(`<script type="module">`) + `<script type="module">`.length;
      if (compile && indexJs >= 0) {
        const slice = html.slice(indexJs, html.indexOf(`</script>`));
        newSizeJs += stringBytesLength(slice);
        const jsCode = slice;
        const jsSizes = countJsSizes(jsCode);
        newSizeJs = jsSizes[0];
        newSizeMedia += jsSizes[1];
      }

      sizeHtml += stringBytesLength(html) - sizeCss - newSizeJs - newSizeMedia;
      sizeJs += newSizeJs;
      sizeMedia += newSizeMedia;
    } else if (path.endsWith(`.js`)) {
      const jsCode = await file.text();
      const jsSizes = countJsSizes(jsCode);
      sizeJs += jsSizes[0];
      sizeMedia += jsSizes[1];
    } else {
      sizeMedia += file.size;
    }
  }

  const sizeTotal = sizeHtml + sizeCss + sizeJs + sizeMedia;
  if (sizeTotal !== sizeTotalControl) {
    throw new Error(`Sizes not maches! ${sizeTotal} ${sizeTotalControl}`);
  }

  printOutputSize(`html `, sizeHtml);
  printOutputSize(`css  `, sizeCss);
  printOutputSize(`js   `, sizeJs);
  printOutputSize(`media`, sizeMedia);
  printOutputSize(`total`, sizeTotal);
}

function countJsSizes(jsCode: string): [sizeJs: number, sizeMedia: number] {
  let sizeJs = stringBytesLength(jsCode);
  let sizeMedia = 0;

  // count string media as media
  const matches = jsCode.matchAll(/"data:.*?"/g);
  for (const match of matches) {
    const mediaStr = match[0].slice(`"`.length, -`"`.length);
    if (mediaStr.startsWith(`data:image/`) || mediaStr.startsWith(`data:audio/`)) {
      const mediaSize = stringBytesLength(mediaStr);
      sizeMedia += mediaSize;
      sizeJs -= mediaSize;
    } else {
      throw new Error(`Unknown media! Src: ${mediaStr}`);
    }
  }

  return [sizeJs, sizeMedia];
}

function stringBytesLength(str: string): number {
  return new TextEncoder().encode(str).length;
}

function printOutputSize(label: string, bytes: number) {
  const space = bytes < 10000 ? `  ` : bytes < 100000 ? ` ` : ``;
  console.log(`${label}   ${space}${(bytes / 1000).toFixed(3)} kB`);
}

function removeScriptsAndComments(text: string): string {
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
function removeCrossorgin(text: string): string {
  return text.replaceAll(/\s+crossorigin/g, ``);
}
