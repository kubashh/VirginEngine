import { config } from "../../lib/consts"
import { getFilesAndScene, joinFiles, optymalizeJs } from "../fn"
import { staticFiles } from "./staticFiles"

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
