import { joinFiles } from "./fn/joinAndImport"
import { optymalizeJs } from "./fn/optymalizeJs"
import { getFilesAndScene } from "./fn/getFilesAndScene"
import { functions } from "./lib/functions"
import { values } from "./lib/values"

export const jsCode = () => optymalizeJs(joinFiles(
  getFilesAndScene(),
  values,
  functions
))