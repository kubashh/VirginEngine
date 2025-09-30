#!/usr/bin/env bun
import plugin from "bun-plugin-tailwind"
import { existsSync, rmSync } from "fs"
import { relative } from "path"
import { buildCore } from "./core/main"

// Build VE core
await buildCore()

// Build HTML

const outdir = `./dist`

const config: Bun.BuildConfig = {
  entrypoints: [`./src/app/index.html`],
  outdir,
  plugins: [plugin],
  minify: true,
  target: `browser`,
  sourcemap: `none`,
  define: {
    "process.env.NODE_ENV": `"production"`,
  },
}

console.log(`Starting build process...`)

if (existsSync(outdir)) {
  console.log(`Cleaning previous build...`)
  rmSync(outdir, { recursive: true, force: true })
}

const start = performance.now()

// Build all the HTML files
const result = await Bun.build(config)

// Minify html code
const htmlFile = Bun.file(`${outdir}/index.html`)
let html = minifyHtml(await htmlFile.text())

// Bundle css into html
const cssArtefact = result.outputs.find((e) => e.path.endsWith(`.css`))
if (cssArtefact?.path) {
  const cssFile = Bun.file(cssArtefact.path)

  const cssStart = html.indexOf(`<link rel="stylesheet"`)

  let cssEnd = cssStart
  for (; cssEnd < html.length; cssEnd++) {
    if ([`/>`, `">`].includes(html.slice(cssEnd, cssEnd + 2))) {
      cssEnd += 2
      break
    }
  }

  const slice = html.slice(cssStart, cssEnd)
  const cssCode = `<style>${minifyHtml(await cssFile.text())}</style>`

  html = html.replace(slice, cssCode)
  cssFile.delete()
  result.outputs.splice(result.outputs.indexOf(cssArtefact), 1)
}

htmlFile.write(html)

// Print the results
const buildTime = (performance.now() - start).toFixed(2)

const [outputSize, maxPathLength] = result.outputs.reduce(
  (prev, e) => [prev[0] + e.size, Math.max(prev[1], relative(process.cwd(), e.path).length)],
  [0, 0]
)

const outputTable = result.outputs.reduce(
  (prev, output) => prev + `  ${formatPath(output.path)}   ${formatFileSize(output.size)}\n`,
  ``
)
console.log(`\nOutput:
${outputTable}
All size: ${formatFileSize(outputSize)}
Done in ${buildTime}ms\n`)

// Helper function to format file sizes
function formatFileSize(size: number): string {
  const units = [`B`, `KB`, `MB`, `GB`]
  let unitIndex = 0

  for (; size >= 1024 && unitIndex < units.length - 1; unitIndex++) {
    size /= 1024
  }

  return `${size.toFixed(2)} ${units[unitIndex]}`
}

function minifyHtml(text: string) {
  return text
    .replaceAll(`\n`, ` `)
    .replaceAll(/\s{2,}/g, ` `)
    .replaceAll(/ > | >|> /g, `>`)
    .replaceAll(/ < | <|< /g, `<`)
    .replaceAll(/ ; | ;|; /g, `;`)
    .replaceAll(/ { | {|{ /g, `{`)
    .replaceAll(/ } | }|} /g, `}`)
    .replaceAll(/ " | "|" /g, `"`)
    .replaceAll(/ , | ,|, /g, `,`)
  // .replaceAll(/\/\*[\s\S]*?\*\//g, ``) // Remove comments
}

function formatPath(path: string) {
  path = relative(process.cwd(), path)

  while (path.length < maxPathLength) path += ` `

  return path
}
