import { joinFiles } from "./fn/joinAndImport"
import { optymalizeJs } from "./fn/optymalizeJs"
import { getFilesAndScene } from "./fn/getFilesAndScene"
import { staticFiles } from "./lib/staticFiles"

export const jsCode = () =>
  optymalizeJs(
    joinFiles(
      staticFiles,
      getFilesAndScene(),
      `
        run()
        document.body.children[1].remove()
      `
    )
  )
