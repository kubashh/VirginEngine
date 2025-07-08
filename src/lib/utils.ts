import { allowedNameChars, alphabet, config, currentScene, editor, files, keywords } from "./consts"

export function deepCopy(obj: Obj) {
  return JSON.parse(JSON.stringify(obj))
}

function createElement({ name, ...props }: Obj) {
  const element = document.createElement(name)
  for (const key in props) {
    element[key] = props[key]
  }
  element.click()
}

export function downloadFile(name: string, text: string, encode = false) {
  createElement({
    name: `a`,
    href: `data:text;charset=utf-8,${encode ? encodeURIComponent(text) : text}`,
    download: name,
  })
}

export function isFirstUpperCase(text: string) {
  return alphabet.toUpperCase().includes(text[0])
}

export function isValidName(name: string) {
  if (name.length === 0 || !isFirstUpperCase(name)) return false

  for (let i = 1; i < name.length; i++) {
    if (!allowedNameChars.includes(name[i].toLowerCase())) return false
  }

  return true
}

export function addSpaceBeforeUpper(text: string) {
  return text
    .slice(1)
    .split(``)
    .reduce((prev, char) => `${prev}${char === char.toUpperCase() ? ` ` : ``}${char}`, text[0].toUpperCase())
}

export function includesKeywords(text: string) {
  return keywords.includes(text)
}

export function isCustomProp(text: string) {
  return !isFirstUpperCase(text) && !includesKeywords(text)
}

export function openScene(scene: Obj, name: string) {
  editor.selectedSceneName = name
  currentScene.value = scene
}

export function openMainScene() {
  editor.setUp = true
  let scene = files.value
  let key
  for (key of config.pathToMainScene.split(`.`).slice(1)) {
    scene = scene[key]
  }

  if (!key) throw Error(`No main scene!`)

  openScene(scene, key)
}

export function defaultGameObject({ position, rotation, scale, ...rest }: Obj = {}) {
  return Object.keys(rest).reduce((prev, key) => ({ [key]: rest[key], ...prev }), {
    type: `gameObject`,
    transform: {
      position: position || { x: 0, y: 0 },
      rotation: rotation || { z: 0 },
      scale: scale || { x: 1, y: 1 },
    },
  })
}

export function capitalize(text: string) {
  return text.length === 0 || text[0] === text[0].toUpperCase()
    ? text
    : `${text[0].toUpperCase()}${text.slice(1)}`
}

export function isOccupied(obj: Obj, name: string) {
  for (const key in obj) if (key === name) return true

  return false
}

// LoadFile
function clearAssign(old: Obj, obj: Obj) {
  for (const key in old) delete old[key]
  for (const key in obj) old[key] = obj[key]
}

export function loadFile(refresh: Void) {
  return createElement({
    name: `input`,
    type: `file`,
    accept: `.virginengine`,
    onchange: ({ target }: { target: any }) => {
      const reader = new FileReader()

      reader.onload = ({ target }: { target: any }) => {
        const data = JSON.parse(target.result)

        clearAssign(config, data.config)
        clearAssign(files.value, data.files)

        openMainScene()
        if (typeof refresh === `function`) refresh?.()
      }

      reader.readAsText(target.files[0])
    },
  })
}

// Type
export function getType(data: any) {
  if (typeof data !== `string`) return typeof data

  if (Array.isArray(data) || data[0] === `[`) return `array`
  if (data[0] === `{`) return `object`
  if (data.indexOf(`function`) === 0) return `function`
  if ([`"`, `'`, "`"].includes(data[0])) return `string`
  return `string`
}
