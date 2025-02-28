import { joinFiles } from "./fn/joinAndImport"
import { optymalizeJs } from "./fn/optymalizeJs"
import { getFilesAndScene } from "./fn/getFilesAndScene"
import { functions } from "./lib/functions"
import { values } from "./lib/values"
import { components } from "./lib/components"

export const jsCode = () =>
  optymalizeJs(
    joinFiles(
      components,
      values,
      functions,
      getFilesAndScene(),
      `
        run()
        document.body.children[1].remove()
      `
    )
  )
