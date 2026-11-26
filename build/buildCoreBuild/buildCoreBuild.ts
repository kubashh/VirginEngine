/// <reference types="bun" />

export async function buildCoreBuild() {
  const core = await buildEngineCore();

  const { outputs } = await Bun.build({
    entrypoints: [`./build/coreBuildFn/coreBuild.ts`],
    outdir: `.`,
    naming: `./editor/lib/core.js`,
    minify: {
      whitespace: true,
      identifiers: true,
      // syntax: true,
    },
    target: `bun`,
  });

  let js = await outputs[0].text();
  js = js.replace(`REPLACE_CORE`, core);
  await Bun.write(outputs[0].path, js);
}

async function buildEngineCore() {
  const { outputs } = await Bun.build({
    entrypoints: [`./core/core.js`],
    target: `bun`,
  });

  let text = await outputs[0].text();
  text = text.replace(/^.*console\.log\(`Engine:.*\n?/gm, ``);
  return JSON.stringify(optymalize(text));
}

// helpers

function optymalize(js: string) {
  return js
    .replaceAll(/\/\*[\s\S]*?\*\/|\/\/.*/g, ``) // remove comments
    .split(`\n`)
    .map((line) => line.trim())
    .filter((line) => line !== ``)
    .join(`\n`);
}
