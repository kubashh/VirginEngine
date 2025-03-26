import { config, files } from "../lib/consts"
import { isCustomProp } from "../lib/utils"

// Optymalize JavaScript
const optymalizeJs = (text) =>
  text
    .replace(/\/\*[\s\S]*?\*\/|\/\/.*/g, ``) // Remove comments
    //.replace(`\n`, `;`)
    .split(`\n`) // Split into lines
    .map((line) => line.trim()) // Trim lines
    .filter((line) => line !== ``) // Remove empty lines
    //.map(line => line.replace(/\s*([({[])\s*/g, `$1`)) // Remove spaces before brackets
    .join(`\n`) // Join lines
//.replace(/\s{2,}/g, ` `) // Replace multiple spaces with a single space

// Files methods
const joinFiles = (...files) =>
  files.reduce((old, current) => `${old}\n${current}`)

const filesToString = (data, name, type) => {
  if (Array.isArray(data)) {
    return `${data
      .reduce((old, e) => {
        return `${old}${filesToString(e)},`
      }, `[`)
      .slice(0, -1)}]`
  }

  if (typeof data === `object`) {
    return `${Object.keys(data)
      .reduce((old, key) => {
        return `${old}${key}:${filesToString(data[key], key, data.type)},`
      }, `{`)
      .slice(0, -1)}}`
  }

  return type === `gameObject` && isCustomProp(name)
    ? data
    : JSON.stringify(data)
}

const importFile = async (file) =>
  await fetch(file.default).then((r) => r.text())

const getImports = async (imports) => {
  const files = []
  for (const imp of imports) {
    files.push(await importFile(imp))
  }
  return files
}

const importJoinFiles = async (...imports) =>
  joinFiles(...(await getImports(imports)))

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

const dynamicData = () => `
  const files = ${filesToString(files)}
  loadScene(${config.pathToMainScene})
  run()
  //document.body.children[1].remove()
`

export const jsCode = () => optymalizeJs(joinFiles(staticFiles, dynamicData()))
