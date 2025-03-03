import { allowedNameChars, alphabet, keyWords } from "./consts"

export const downloadFile = (name, text, encode = false) => {
  const htmlElement = document.createElement(`a`)
  // Ustawienie typu i kodowania encodeURIComponent(jsonData)
  htmlElement.href = `data:text;charset=utf-8,${encode ? encodeURIComponent(text) : text}`
  htmlElement.download = name
  htmlElement.click()
}

export const isFirstUpperCase = (text) =>
  typeof text === `string` && alphabet.toUpperCase().includes(text[0])

export const isValidName = (name) => {
  if (!isFirstUpperCase(name)) return false

  for (let i = 1; i < name.length; i++) {
    if (!allowedNameChars.includes(name[i].toLowerCase())) return false
  }

  return true
}

export const addSpaceBeforeUpper = (text) =>
  text
    .slice(1)
    .split(``)
    .reduce(
      (prev, char) => `${prev}${char === char.toUpperCase() ? ` ` : ``}${char}`,
      text[0].toUpperCase()
    )

const includesKeywords = (text) => keyWords.includes(text)

export const isCustomProp = (text) =>
  !isFirstUpperCase(text) && !includesKeywords(text)

export const openScene = (sceneName) => {
  window.editor.selectedScene = sceneName

  window.editor.reloadHierarchy?.()
}

export const defaultGameObject = () => ({
  type: `gameObject`,
  transform: {
    position: {
      x: 0,
      y: 0
    },
    rotation: {
      z: 0
    },
    scale: {
      x: 1,
      y: 1
    }
  }
})
