export async function buildCore() {
  await Bun.build({
    entrypoints: [`./core/src/core.ts`],
    outdir: `./src/build`,
    naming: `core.ts`,
  })

  const coreFile = Bun.file(`./src/build/core.ts`)

  const js = encode(
    optymalize(
      (await coreFile.text())
        .split(`\n`)
        .filter((line) => !line.includes("console.log(`Engine:"))
        .join(`\n`)
    )
  )

  const outText = `export const core = \`${js}\``

  await coreFile.write(outText)
}

export function optymalize(js: string) {
  return js
    .replaceAll(/\/\*[\s\S]*?\*\/|\/\/.*/g, ``) // Remove comments
    .split(`\n`)
    .map((line) => line.trim())
    .filter((line) => line !== ``)
    .join(`\n`)
}

function encode(s: string) {
  return s.replaceAll("`", "\\`").replaceAll(`$`, `\\$`)
}
