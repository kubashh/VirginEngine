const importFile = async (file) => {
  return await fetch(file.default).then(r => r.text())
}

const test = await importFile(await import("./lib/test.txt"))

console.log(test)

const getFilesString = () => {
  const { config, ...files } = window.files
  return JSON.stringify(files)
}

export const jsCode = () => {
  return `
    const canvas = document.body.children[0]
    const ctx = canvas.getContext("2d")
    console.log(canvas)
    const files = JSON.parse(${getFilesString()})
  `
}