/// <reference types="bun-types" />

// Build core
await build(`./core/src/core.ts`, `./core/build/core.ts`, (text: string) => {
  text = text
    .split(`\n`)
    .filter((line) => !line.startsWith("console.log(`Engine:"))
    .join(`\n`);
  text = encode(optymalize(text));
  return `export const core = \`${text}\``;
});

// Build build
await build(`./core/build/build.ts`, `./src/build/core.js`, (text: string) => {
  return `// @bun\n// @ts-ignore\n${text}`;
});

// Helpers
async function build(entry: string, outpath: string, cb: (text: string) => string) {
  const { outputs } = await Bun.build({
    entrypoints: [entry],
    outdir: `.`,
    naming: outpath,
    minify: process.argv.includes(`-p`) && {
      whitespace: true,
      syntax: true,
    },
    target: `bun`,
  });

  const js = await outputs[0].text();
  await Bun.write(outputs[0].path, cb(js));
}

function optymalize(js: string) {
  return js
    .replaceAll(/\/\*[\s\S]*?\*\/|\/\/.*/g, ``) // Remove comments
    .split(`\n`)
    .map((line) => line.trim())
    .filter((line) => line !== ``)
    .join(`\n`);
}

function encode(s: string) {
  return s.replaceAll("`", "\\`").replaceAll(`$`, `\\$`);
}
