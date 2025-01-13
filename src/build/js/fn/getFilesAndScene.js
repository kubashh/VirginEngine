export const getFilesAndScene = () => {
  const { Scenes, ...files } = window.files
  return `
    const files = JSON.parse('${JSON.stringify(files)}')
    const Scenes = JSON.parse('${JSON.stringify(Scenes)}')
    let selectedScene = Scenes.defaultScene
  `
}