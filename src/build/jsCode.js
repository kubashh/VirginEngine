import { config, files } from "../lib/consts"
import { isCustomProp } from "../lib/utils"

// Optymalize JavaScript
function optymalizeJs(text) {
  return (
    text
      .replace(/\/\*[\s\S]*?\*\/|\/\/.*/g, ``) // Remove comments
      // .replace(`\n`, `;`)
      .split(`\n`) // Split into lines
      .map((line) => line.trim()) // Trim lines
      .filter((line) => line !== ``) // Remove empty lines
      // .map(line => line.replace(/\s*([({[])\s*/g, `$1`)) // Remove spaces before brackets
      .join(`\n`)
  ) // Join lines
  // .replace(/\s{2,}/g, ` `) // Replace multiple spaces with a single space
}

// Files methods
function joinFiles(...files) {
  return files.reduce((prev, current) => `${prev}\n${current}`)
}

function filesToString(data, name, type) {
  if (Array.isArray(data)) {
    return `${data
      .reduce((prev, e) => {
        return `${prev}${filesToString(e)},`
      }, `[`)
      .slice(0, -1)}]`
  }

  if (typeof data === `object`) {
    return `${Object.keys(data)
      .reduce((prev, key) => {
        return `${prev}${key}:${filesToString(data[key], key, data.type)},`
      }, `{`)
      .slice(0, -1)}}`
  }

  return type === `gameObject` && isCustomProp(name) ? data : JSON.stringify(data)
}

async function importJoinFiles(...imports) {
  return joinFiles(
    ...(await Promise.all(imports.map(async (imp) => await fetch(imp.default).then((r) => r.text()))))
  )
}

// Static files
const staticFiles = await importJoinFiles(
  // Values
  await import("./values/values.j"),

  // Components
  await import("./components/GameObject.j"),
  await import("./components/Transform.j"),
  await import("./components/Collider.j"),
  await import("./components/Physics.j"),
  await import("./components/Sprite.j"),
  await import("./components/Animation.j"),
  await import("./components/Text.j"),

  // Functions
  await import("./functions/basicFunctions.j"),
  await import("./functions/runUpdateRender.j")
)

function dynamicData() {
  return `
const files = ${filesToString(files)}
loadScene(${config.pathToMainScene})
run()
//document.body.children[1].remove()
`
}

export function jsCode() {
  return optymalizeJs(joinFiles(staticFiles, dynamicData()))
}
