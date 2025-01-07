import { getFilesAndScene } from "./fn/getFilesAndScene"

const importFile = async (file) => await fetch(file.default).then(r => r.text())

const canvasText = await importFile(await import("./lib/canvas.j"))
const startUpdateRender = await importFile(await import("./lib/startUpdateRender.j"))

export const jsCode = () => {
  return `
    ${canvasText}
    ${getFilesAndScene()}
    ${startUpdateRender}
  `
}