export const getFilesAndScene = () => {
  return `
    const files = JSON.parse('${JSON.stringify(window.files)}')
    let selectedScene = files.${window.config.pathToMainScene}
  `
}