export function minify(js: string) {
  return js
    .replaceAll(/\/\*[\s\S]*?\*\/|\/\/.*/g, ``) // Remove comments
    .split(`\n`)
    .map((line) => line.trim()) // Trim lines
    .filter((line) => line !== ``) // Remove empty lines
    .join(``) // `\n`
}
