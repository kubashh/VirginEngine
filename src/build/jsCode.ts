import { core } from "./core"
import { conf, files } from "../lib/consts"
import { isCustomProp } from "../lib/utils"

function filesToString(data: Any, name?: string, type?: string): any {
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

  return type === `gameObject` && isCustomProp(name!) ? data : JSON.stringify(data)
}

export function jsCode() {
  return core
    .replace("`REPLACE_FILES`", filesToString(files.value))
    .replace("`REPLACE_PATH_TO_MAIN_SCENE`", conf.pathToMainScene)
}
