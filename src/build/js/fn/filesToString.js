import { isCustomProp } from "../../../lib/utils"

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
