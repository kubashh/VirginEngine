export async function build() {
  await Bun.build({
    entrypoints: [`./core/src/core.ts`],
    outdir: `./src/build`,
    naming: `core.ts`,
  })

  const file = Bun.file(`./src/build/core.ts`)

  const js = encode(
    optymalize(
      (await file.text())
        .split("\n")
        .filter((line) => !line.includes("console.log(`Engine:"))
        .join("\n")
    )
  )

  const outText = `export const core = \`${js}\``

  await file.write(outText)
}

export function optymalize(js: string) {
  return js
    .replaceAll(/\/\*[\s\S]*?\*\/|\/\/.*/g, ``) // Remove comments
    .split(`\n`)
    .map((line) => line.trim()) // Trim lines
    .filter((line) => line !== ``) // Remove empty lines
    .join(`\n`)
}

function encode(s: string) {
  return s.replaceAll("`", "\\`").replaceAll(`$`, `\\$`)
}
