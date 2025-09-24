import { minify_sync } from "terser"
import { core } from "./core"
import { config, files } from "../lib/consts"
import { isCustomProp } from "../lib/util"

function filesToString(data: Any, name?: string, type?: string): any {
  if (typeof data !== `object`) return type === `node` && isCustomProp(name!) ? data : JSON.stringify(data)

  if (Array.isArray(data)) {
    return `[${data
      .reduce((prev, e) => {
        return `${prev}${filesToString(e)},`
      }, ``)
      .slice(0, -1)}]`
  }

  if (data.type === `img`) return `"${data.src}"`

  return `{${Object.keys(data)
    .reduce((prev, key) => {
      return `${prev}${key}:${filesToString(data[key], key, data.type)},`
    }, ``)
    .slice(0, -1)}}`
}

function coreConfig() {
  let trueCore = core

  if (!config.fullScreen)
    trueCore = trueCore
      .split(`\n`)
      .filter((line) => !line.startsWith(`!document.fullscreenElement ?`))
      .join(`\n`)

  return trueCore
    .replace(`"REPLACE_FILES"`, filesToString(files.value))
    .replace(`"REPLACE_PATH_TO_MAIN_SCENE"`, config.pathToMainScene)
}

export function jsCode(production?: boolean) {
  const validCore = coreConfig()

  if (!production) return validCore

  const out = minify_sync(validCore)

  if (out.code) return out.code

  throw Error(JSON.stringify(out))
}
