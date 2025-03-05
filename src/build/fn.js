import { config, files } from "../lib/consts"
import { isCustomProp } from "../lib/utils"

export const optymalizeJs = (text) =>
  text
    .replace(/\/\*[\s\S]*?\*\/|\/\/.*/g, ``) // Remove comments
    //.replace(`\n`, `;`)
    .split(`\n`) // Split into lines
    .map((line) => line.trim()) // Trim lines
    .filter((line) => line !== ``) // Remove empty lines
    //.map(line => line.replace(/\s*([({[])\s*/g, `$1`)) // Remove spaces before brackets
    .join(`\n`) // Join lines
//.replace(/\s{2,}/g, ` `) // Replace multiple spaces with a single space

export const joinFiles = (...files) =>
  files.reduce((old, current) => `${old}\n${current}`)

export const filesToString = (data, name, type) => {
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

export const getFilesAndScene = () => `
  const files = ${filesToString(files)}
  currentScene = loadScene(${config.pathToMainScene})
`
