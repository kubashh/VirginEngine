import { config, files } from "../lib/consts"
import { filesToString, joinFiles, optymalizeJs } from "./fn"

const importFile = async (file) =>
  await fetch(file.default).then((r) => r.text())

const getImports = async (imports) => {
  const files = []
  for (const imp of imports) {
    files.push(await importFile(imp))
  }
  return files
}

const importJoinFiles = async (...imports) =>
  joinFiles(...(await getImports(imports)))

const staticFiles = await importJoinFiles(
  // Components
  await import("./components/GameObject.j"),
  await import("./components/Transform.j"),
  await import("./components/Collider.j"),
  await import("./components/Physics.j"),
  await import("./components/Sprite.j"),
  await import("./components/Animation.j"),
  await import("./components/Text.j"),

  // Functions
  await import("./functions/basicFunctions.j"),
  await import("./functions/runStart.j"),
  await import("./functions/updateRender.j"),

  // Values
  await import("./values/values.j")
)

const dynamicData = () => `
  const files = ${filesToString(files)}
  currentScene = loadScene(${config.pathToMainScene})
  run()
  //document.body.children[1].remove()
`

export const jsCode = () => optymalizeJs(joinFiles(staticFiles, dynamicData()))
