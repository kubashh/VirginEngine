import { config } from "../../lib/consts"
import { getFilesAndScene, joinFiles, optymalizeJs } from "../fn"

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
  // Values
  await import("./values/values.j"),

  // Components
  await import("./components/GameObject.j"),
  await import("./components/Transform.j"),
  await import("./components/Collider.j"),
  await import("./components/Physics.j"),
  await import("./components/Sprite.j"),
  await import("./components/Animation.j"),

  // Functions
  await import("./functions/basicFunctions.j"),
  await import("./functions/start.j"),
  await import("./functions/update.j"),
  await import("./functions/render.j"),
  await import("./functions/run.j")
)

export const jsCode = () =>
  optymalizeJs(
    joinFiles(
      staticFiles,
      getFilesAndScene(),
      `
        loadScene(${config.pathToMainScene})
        run()
        //document.body.children[1].remove()
      `
    )
  )
