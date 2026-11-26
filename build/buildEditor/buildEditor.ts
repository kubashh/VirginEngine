import fs from "fs";
import { minify, type MinifyOptions } from "terser";
import { version as virginEngineVersion } from "../../package.json";
import { minifyCss } from "./minifyCss";

export async function buildEditor() {
  const plugin = (await import("bun-plugin-tailwind")).default;
  const mdStylesPlugin = (await import("../plugins/mdStylesPlugin")).default;

  const config: Bun.BuildConfig = {
    entrypoints: [`./editor/app/indexUpdated.html`],
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
  const indexCss = html.indexOf(`<style>`) + `<style>`.length;
  if (indexCss > `<style>`.length) {
    const indexEnd = html.indexOf(`</style>`, indexCss);
    let cssText = html.slice(indexCss, indexEnd);
    cssText = minifyCss(cssText);
    html = html.slice(0, indexCss) + cssText + html.slice(indexEnd);
  }

  // minify js
  const indexJs = html.indexOf(`<script type="module">`) + `<script type="module">`.length;
  if (indexJs > `<script type="module">`.length) {
    const indexEnd = html.indexOf(`</script>`, indexJs);
    let jsText = html.slice(indexJs, indexEnd);
    jsText = await minifyJs(jsText);
    html = html.slice(0, indexJs) + jsText + html.slice(indexEnd);
  } else {
    const jsFile = outputs.find((a) => a.path.endsWith(`.js`))!;
    let jsCode = await jsFile.text();
    jsCode = await minifyJs(jsCode);
    await Bun.write(jsFile.path, jsCode);
  }

  await Bun.write(htmlArtifact.path, html);

  const printPaths: string[] = outputs.map((a) => a.path).filter((path) => !path.endsWith(`.css`));
  printSize(printPaths);
}

async function minifyJs(code: string): Promise<string> {
  // remove stupid __REACT_DEVTOOLS_GLOBAL_HOOK__
  code = code
    .replaceAll(/__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE\(.+?\)/g, ``)
    .replaceAll(`typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE`, `undefined`)
    .replaceAll(`typeof __REACT_DEVTOOLS_GLOBAL_HOOK__`, `undefined`)
    .replaceAll(`"__REACT_DEVTOOLS_GLOBAL_HOOK__",`, ``);

  // minify with terser. this is another optimalization (first was bun)
  const minifyOptions: MinifyOptions = {
    module: true,
    ecma: 2025,
    // compress: true,
    compress: {
      passes: 10,
      toplevel: true,

      // remove debugging code
      drop_console: false,
      drop_debugger: true,

      // more aggressive transformations
      unsafe: true,
      unsafe_arrows: true,
      unsafe_comps: true,
      pure_getters: true,

      // optional extra optimizations
      hoist_props: true,
      reduce_funcs: true,
      reduce_vars: true,
      collapse_vars: true,
      inline: 3,
    },
    mangle: true,
    format: {
      comments: false,
    },
  };

  const newCode = (await minify(code, minifyOptions)).code;
  if (!newCode) throw new Error(`Error minifing js with terser!`);
  if (code.length < newCode.length) throw new Error(`Minified code is larger!`);
  return newCode;
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
    } else if (!mediaStr.startsWith(`data:text`)) {
      throw new Error(`Unknown media! Src: ${mediaStr}`);
    }
  }

  return [sizeJs, sizeMedia];
}

function stringBytesLength(str: string): number {
  return Buffer.byteLength(str, `utf8`);
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
