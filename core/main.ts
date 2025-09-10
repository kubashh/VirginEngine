import { minify } from "./minify/minify"

export async function build() {
  await Bun.build({
    entrypoints: [`./core/src/core.ts`],
    outdir: `./src/build`,
    naming: `core.ts`,
  })

  const file = Bun.file(`./src/build/core.ts`)

  const js = encode(minify(await file.text()))

  const outText = `export const core = \`${js}\``

  await file.write(outText)
}

function encode(s: string) {
  const buf = []
  for (const e of s) {
    if (["`", `$`].includes(e)) buf.push(`\\`)
    buf.push(e)
  }
  return buf.join(``)
}
