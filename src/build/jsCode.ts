import { minify_sync } from "terser"
import { core } from "./core"
import { conf, files } from "../lib/consts"
import { isCustomProp } from "../lib/util"

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

export function jsCode(production?: boolean) {
  const basic = core
    .replace("`REPLACE_FILES`", filesToString(files.value))
    .replace("`REPLACE_PATH_TO_MAIN_SCENE`", conf.pathToMainScene)

  if (!production) return basic

  const out = minify_sync(basic)

  if (out.code) return out.code

  throw Error(JSON.stringify(out))
}
