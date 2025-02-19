import { filesToString } from "./filesToString"

export const getFilesAndScene = () => `
  const files = ${filesToString(window.files)}
  let currentScene = files.${window.config.pathToMainScene}
`