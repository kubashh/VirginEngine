import { objectToString } from "./objectToString"

export const getFilesAndScene = () => `
  const files = ${objectToString(window.files)}
  let selectedScene = files.${window.config.pathToMainScene}
`