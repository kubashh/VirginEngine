export async function buildCore() {
  const output = await Bun.build({
    entrypoints: [`./core/src/core.ts`],
    outdir: `.`,
    naming: `./src/build/core.ts`,
  })

  const coreFile = Bun.file(output.outputs[0].path)

  const js = encode(
    optymalize(
      (await coreFile.text())
        .split(`\n`)
        .filter((line) => !line.startsWith("console.log(`Engine:"))
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
