#!/usr/bin/env bun
import plugin from "bun-plugin-tailwind"
import { existsSync } from "fs"
import { rm } from "fs/promises"
import { relative } from "path"
import { build } from "./core/main"

// Build VE core
await build()

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

// Helper function to format file sizes
function formatFileSize(bytes: number): string {
  const units = [`B`, `KB`, `MB`, `GB`]
  let size = bytes
  let unitIndex = 0

  while (size >= 1024 && unitIndex < units.length - 1) {
    size /= 1024
    unitIndex++
  }

  return `${size.toFixed(2)} ${units[unitIndex]}`
}

console.log(`\n🚀 Starting build process...\n`)

if (existsSync(outdir)) {
  console.log(`🗑️ Cleaning previous build at ${outdir}`)
  await rm(outdir, { recursive: true, force: true })
}

const start = performance.now()

// Build all the HTML files
const result = await Bun.build(config)

// Print the results
const end = performance.now()
const buildTime = (end - start).toFixed(2)

const outputTable = result.outputs.map((output) => ({
  File: relative(process.cwd(), output.path),
  Type: output.kind,
  Size: formatFileSize(output.size),
}))

console.table(outputTable)
console.log(`\n✅ Build completed in ${buildTime}ms\n`)
