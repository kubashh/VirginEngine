import { objectToString } from "./objectToString"

export const getFilesAndScene = () => `
  const files = ${objectToString(window.files)}
  let currentScene = files.${window.config.pathToMainScene}
`