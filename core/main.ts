import { readFileSync, unlinkSync, writeFileSync } from "fs"

await Bun.build({
  entrypoints: [`src/core.ts`],
  outdir: `../src/build`,
})

const file = optymalizeJs(String(readFileSync(`../src/build/core.js`)))

unlinkSync(`../src/build/core.js`)

const outFile = `export const core = \`${encode(file)}\``

writeFileSync(`../src/build/core.ts`, outFile)

// Optymalize JavaScript
function optymalizeJs(text: string) {
  return text
    .replace(/\/\*[\s\S]*?\*\/|\/\/.*/g, ``) // Remove comments
    .split(`\n`) // Split into lines
    .map((line) => line.trim()) // Trim lines
    .filter((line) => line !== ``) // Remove empty lines
    .join(`\n`) // Join lines
}

function encode(s: string) {
  const buf: string[] = []
  for (const e of s) {
    if (["`", `$`].includes(e)) buf.push(`\\`)
    buf.push(e)
  }
  return buf.join(``)
}
