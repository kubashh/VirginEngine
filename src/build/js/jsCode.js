import { getFilesAndScene, joinFiles, optymalizeJs } from "../fn"
import { staticFiles } from "./staticFiles"

export const jsCode = () =>
  optymalizeJs(
    joinFiles(
      staticFiles,
      getFilesAndScene(),
      `
        run()
        //document.body.children[1].remove()
      `
    )
  )
