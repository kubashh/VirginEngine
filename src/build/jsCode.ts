import { minify_sync } from "terser"
import { core } from "./core"
import { config, files } from "../lib/consts"
import { isCustomProp, optymalizeImageSrc } from "../lib/util"

const typeKeywords = [`scene`, `node`]
function filesToString(data: Any, name?: string, type?: string): (string | Promise<string>)[] {
  if (typeof data !== `object`)
    return [type === `node` && isCustomProp(name!) ? data : JSON.stringify(data)]

  if (Array.isArray(data)) {
    return [
      `[`,
      data
        .reduce((prev, e) => {
          return [...prev, ...filesToString(e), `,`]
        }, [])
        .slice(0, -1),
      `]`,
    ]
  }

  if (data.type === `img`) {
    return [`"`, optymalizeImageSrc(data.src, data.quality), `"`]
  }
  if (data.type === `audio`) {
    return [`"${data.src}"`]
  }

  return [
    `{`,
    ...Object.keys(data)
      .filter((key) => key !== `type` || !typeKeywords.includes(data[key]))
      .reduce((prev, key) => {
        return [...prev, `${key}:`, ...filesToString(data[key], key, data.type), `,`]
      }, [] as (string | Promise<string>)[])
      .slice(0, -1),
    `}`,
  ]
}

async function coreConfig() {
  let trueCore = core

  if (!config.fullScreen)
    trueCore = trueCore
      .split(`\n`)
      .filter((line) => !line.startsWith(`!document.fullscreenElement ?`))
      .join(`\n`)

  const arr = filesToString(files.value)

  for (const i in arr) {
    arr[i] = await arr[i]
  }

  return trueCore
    .replace(`"REPLACE_FILES"`, arr.join(``))
    .replace(`"REPLACE_PATH_TO_MAIN_SCENE"`, config.pathToMainScene)
}

export async function jsCode(production?: boolean) {
  const validCore = await coreConfig()

  if (!production) return validCore

  const out = minify_sync(validCore, {
    module: true, // size -10%
  })

  if (out.code) return out.code

  throw Error(JSON.stringify(out))
}
