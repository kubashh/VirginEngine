export const openScene = (sceneName) => {
  window.editor.selectedScene = sceneName

  window.editor.reloadHierarchy?.()
}