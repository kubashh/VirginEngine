import { allowedNameChars, alphabet, editor, keywords } from "./consts"

export const downloadFile = (name, text, encode = false) =>
  createElement({
    name: `a`,
    href: `data:text;charset=utf-8,${encode ? encodeURIComponent(text) : text}`,
    download: name,
    click: true
  })

export const isFirstUpperCase = (text) =>
  alphabet.toUpperCase().includes(text[0])

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

export const includesKeywords = (text) => keywords.includes(text)

export const isCustomProp = (text) =>
  !isFirstUpperCase(text) && !includesKeywords(text)

export const openScene = (scene, sceneName) => {
  editor.selectedScene = scene
  editor.selectedSceneName = sceneName

  editor.reloadHierarchy?.()
}

export const defaultGameObject = () => ({
  type: `gameObject`,
  transform: {
    position: { x: 0, y: 0 },
    rotation: { z: 0 },
    scale: { x: 1, y: 1 }
  }
})

export const createElement = ({ name, click, ...props }) => {
  const element = document.createElement(name)
  for (const key in props) {
    element[key] = props[key]
  }
  click && element.click()
}
