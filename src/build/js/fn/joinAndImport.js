export const importFile = async (file) =>
  await fetch(file.default).then((r) => r.text())

export const joinFiles = (...files) =>
  files.reduce((old, current) => `${old}\n${current}`)
