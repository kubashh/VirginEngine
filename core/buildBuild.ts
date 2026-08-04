/// <reference types="bun" />

// Build build
await build();

async function build() {
  const htmlTemplate = minifyHtml(await Bun.file(`./core/build/template.html`).text());
  const core = await buildEngineCore();

  const { outputs } = await Bun.build({
    entrypoints: [`./core/build/build.ts`],
    outdir: `.`,
    naming: `./src/lib/core.js`,
    minify: {
      whitespace: true,
      identifiers: true,
      // syntax: true,
    },
    target: `bun`,
    define: {
      REPLACE_HTML_TEMPLATE: JSON.stringify(htmlTemplate),
      REPLACE_VIRGINE_ENGINE_VERSION: JSON.stringify((await Bun.file(`./package.json`).json()).version),
      // REPLACE_CORE: core, // do not works, why?? it copyies only first line!
    },
  });

  let js = await outputs[0].text();
  js = js.replace(`REPLACE_CORE`, core);
  await Bun.write(outputs[0].path, js);
}

async function buildEngineCore() {
  const { outputs } = await Bun.build({
    entrypoints: [`./core/src/core.js`],
    target: `bun`,
  });
  let text = await outputs[0].text();

  text = text.replace(/^.*console\.log\(`Engine:.*\n?/gm, ``);

  return JSON.stringify(optymalize(text));
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
