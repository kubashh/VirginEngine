export async function build() {
  await Bun.build({
    entrypoints: [`./core/src/core.ts`],
    outdir: `./src/build`,
    naming: `core.ts`,
  })

  const file = Bun.file(`./src/build/core.ts`)

  const outText = `export const core = \`${js(await file.text())}\``

  await file.write(outText)
}

function js(text: string) {
  return encode(optymalizeJs(text))
}

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
