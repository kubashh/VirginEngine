const importFile = async (file) =>
  await fetch(file.default).then((r) => r.text())

const getImports = async (imports) => {
  const files = []
  for (const imp of imports) {
    files.push(await importFile(imp))
  }
  return files
}

export const joinFiles = (...files) =>
  files.reduce((old, current) => `${old}\n${current}`)

export const importJoinFiles = async (...imports) =>
  joinFiles(...(await getImports(imports)))
