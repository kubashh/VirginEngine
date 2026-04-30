/// <reference types="bun" />

// Build build
build();

async function build() {
  const htmlTemplate = minifyHtml(await Bun.file(`./core/build/template.html`).text());

  const { outputs } = await Bun.build({
    entrypoints: [`./core/build/build.ts`],
    outdir: `.`,
    naming: `./src/build/core.ts`,
    minify: {
      whitespace: true,
      identifiers: true,
      // syntax: true,
    },
    target: `bun`,
  });

  let js = await outputs[0].text();
  js = js
    .replace(`REPLACE_HTML_TEMPLATE`, htmlTemplate)
    .replace(`REPLACE_VIRGINE_ENGINE_VERSION`, (await Bun.file(`./package.json`).json()).version)
    .replace(`REPLACE_CORE`, await buildEngineCore())
    .replace(`// @bun\n`, `// @bun\n// @ts-nocheck\n`);
  await Bun.write(outputs[0].path, js);
  return js;
}

async function buildEngineCore() {
  const { outputs } = await Bun.build({
    entrypoints: [`./core/src/core.ts`],
    minify: {},
    target: `bun`,
  });
  let text = await outputs[0].text();

  text = text.replace(/^.*console\.log\(`Engine:.*\n?/gm, ``);

  return encode(optymalize(text));
}

// Helpers

function optymalize(js: string) {
  return js
    .replaceAll(/\/\*[\s\S]*?\*\/|\/\/.*/g, ``) // Remove comments
    .split(`\n`)
    .map((line) => line.trim())
    .filter((line) => line !== ``)
    .join(`\n`);
}

function encode(js: string) {
  return js.replaceAll("`", "\\`").replaceAll(`$`, `\\$`);
}

function minifyHtml(text: string) {
  return text
    .replaceAll(/\/\*[\s\S]*?\*\//g, ``) // Remove comments
    .replaceAll(`\n`, ` `)
    .replaceAll(/\s{2,}/g, ` `)
    .replaceAll(/ > | >|> /g, `>`)
    .replaceAll(/ < | <|< /g, `<`)
    .replaceAll(/ ; | ;|; /g, `;`)
    .replaceAll(/ { | {|{ /g, `{`)
    .replaceAll(/ } | }|} /g, `}`)
    .replaceAll(/ " | "|" /g, `"`)
    .replaceAll(/ , | ,|, /g, `,`)
    .replaceAll(`: `, `:`); // color: red; => color:red;
}
