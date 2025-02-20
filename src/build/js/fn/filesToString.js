import { isCustomProp } from "../../../lib/isCustomProp"

export const filesToString = (data, name, type) => {
  if(Array.isArray(data)) {
    return `${data.reduce((old, e) => {
      return `${old}${filesToString(e)},`
    }, `[`).slice(0, -1)}]`
  }

  if(typeof data === `object`) {
    return `${Object.keys(data).reduce((old, key) => {
      return `${old}${key}:${filesToString(data[key], key, data.type)},`
    }, `{`).slice(0, -1)}}`
  }

  if(type === `gameObject` && isCustomProp(name)) {
    return data
  }

  return JSON.stringify(data)
}