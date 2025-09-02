await Bun.build({
  entrypoints: [`src/core.ts`],
  outdir: `../src/build`,
})

const file = optymalizeJs(await Bun.file(`../src/build/core.js`).text())

await Bun.file(`../src/build/core.js`).delete()

const outFile = `export const core = \`${encode(file)}\``

await Bun.write(`../src/build/core.ts`, outFile)

function optymalizeJs(text: string) {
  return text
    .replaceAll(/\/\*[\s\S]*?\*\/|\/\/.*/g, ``) // Remove comments
    .split(`\n`)
    .map((line) => line.trim()) // Trim lines
    .filter((line) => line !== ``) // Remove empty lines
    .join(``) // `\n`
}

function encode(s: string) {
  const buf = []
  for (const e of s) {
    if (["`", `$`].includes(e)) buf.push(`\\`)
    buf.push(e)
  }
  return buf.join(``)
}
