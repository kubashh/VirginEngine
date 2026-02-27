/// <reference types="bun-types" />

const { outputs } = await Bun.build({
  entrypoints: [`./core/src/core.ts`],
  outdir: `.`,
  naming: `./src/build/core.ts`,
  minify: process.argv.includes(`-p`) && {
    whitespace: true,
    syntax: true,
  },
});

const js = encode(
  optymalize(
    (await outputs[0].text())
      .split(`\n`)
      .filter((line) => !line.startsWith("console.log(`Engine:"))
      .join(`\n`),
  ),
);

const outText = `export const core = \`${js}\`;`;

await Bun.write(outputs[0].path, outText);

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
