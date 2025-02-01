export const objectToString = (data) => {
  if(Array.isArray(data)) {
    return `${data.reduce((old, e) => {
      return `${old}${objectToString(e)},`
    }, `[`).slice(0, -1)}]`
  } else if(typeof data === `object`) {
    return `${Object.keys(data).reduce((old, key) => {
      return `${old}${key}:${objectToString(data[key])},`
    }, `{`).slice(0, -1)}}`
  }

  return JSON.stringify(data)
}