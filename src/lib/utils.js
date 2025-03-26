import {
  allowedNameChars,
  alphabet,
  config,
  editor,
  files,
  keywords
} from "./consts"

const createElement = ({ name, ...props }) => {
  const element = document.createElement(name)
  for (const key in props) {
    element[key] = props[key]
  }
  element.click()
}

export const downloadFile = (name, text, encode = false) =>
  createElement({
    name: `a`,
    href: `data:text;charset=utf-8,${encode ? encodeURIComponent(text) : text}`,
    download: name
  })

export const isFirstUpperCase = (text) =>
  alphabet.toUpperCase().includes(text[0])

export const isValidName = (name) => {
  if (typeof name !== `string` || name.length === 0 || !isFirstUpperCase(name))
    return false

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

export const openMainScene = () => {
  editor.setUp = true
  let scene = files
  let key
  for (key of config.pathToMainScene.split(`.`).slice(1)) {
    scene = scene[key]
  }

  openScene(scene, key)
}

export const defaultGameObject = (props) => ({
  type: `gameObject`,
  transform: {
    position: props?.position || { x: 0, y: 0 },
    rotation: props?.rotation || { z: 0 },
    scale: props?.scale || { x: 1, y: 1 }
  }
})

export const capitalize = (text) =>
  typeof text !== `string` ||
  text.length === 0 ||
  text[0] === text[0].toUpperCase()
    ? text
    : `${text[0].toUpperCase()}${text.slice(1)}`

export const isOccupied = (obj, name) => {
  for (const key in obj) {
    if (key === name) return true
  }
  return false
}

// LoadFile
const clearAssign = (old, obj) => {
  for (const key in old) {
    delete old[key]
  }

  for (const key in obj) {
    old[key] = obj[key]
  }
}

export const loadFile = () =>
  createElement({
    name: `input`,
    type: `file`,
    accept: `.virginengine`,
    onchange: ({ target }) => {
      const reader = new FileReader()

      reader.onload = ({ target }) => {
        const data = JSON.parse(target.result)

        clearAssign(config, data.config)
        clearAssign(files, data.files)

        openMainScene()
        editor.reloadApp()
      }

      reader.readAsText(target.files[0])
    }
  })

// Type
export const getType = (data) => {
  if (typeof data === `boolean`) return `bool`
  if (typeof data === `number`) return `number`
  if (data[0] === `[`) return `array`
  if (data[0] === `{`) return `object`
  if (data.indexOf(`function`) === 0) return `function`
  if ([`"`, `'`, "`"].includes(data[0])) return `string`
  return `string`
}
