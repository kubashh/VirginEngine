import fs from "fs";
import plugin from "bun-plugin-tailwind";
import { virginEngineVersion } from "../lib/core";

const buildConfig: Bun.BuildConfig = {
  entrypoints: [`./src/app/index.html`],
  outdir: `dist`,
  plugins: [plugin],
  minify: true,
  target: `browser`,
  define: {
    "process.env.NODE_ENV": `"production"`,
  },
};

// cleaning
fs.rmSync(`dist`, {
  recursive: true,
  force: true,
});

build(
  !process.argv.includes(`--compile`)
    ? buildConfig
    : { ...buildConfig, compile: true, naming: `VirginEngine-${virginEngineVersion}.html` },
);

async function build(config: Bun.BuildConfig) {
  // build all the HTML files
  const { outputs } = await Bun.build(config);

  const htmlArtifact = outputs.find((f) => f.path.endsWith(`.html`))!;

  let html = await htmlArtifact.text();

  // bun makes empty script tag and left comments, so it can be removed to reduce the size of the output file
  html = removeScriptsAndComments(html);

  // bun add crossorigin attribute
  html = removeCrossorgin(html);

  // bun minify css and js but not html, so we need to minify it manually
  html = minifyHtmlSyntax(html);

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
