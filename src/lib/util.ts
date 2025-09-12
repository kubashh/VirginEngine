import { allowedNameChars, alphabet, config, currentScene, files, keywords, setUp } from "./consts"

export function deepCopy(obj: Any) {
  return JSON.parse(JSON.stringify(obj))
}

function createElement({ name, ...props }: Any) {
  const element = document.createElement(name)
  for (const key in props) element[key] = props[key]
  element.click()
}

export function downloadFile(name: string, text: string) {
  createElement({
    name: `a`,
    href: `data:text;charset=utf-8,${encodeURIComponent(text)}`,
    download: name,
  })
}

export function isFirstUpperCase(text: string) {
  return alphabet.toUpperCase().includes(text[0])
}

export function isValidName(name: string) {
  if (name.length === 0 || !isFirstUpperCase(name)) return false

  for (const c of name) {
    if (!allowedNameChars.includes(c.toLowerCase())) return false
  }

  return true
}

export function addSpaceBeforeUpper(text: string) {
  return text
    .slice(1)
    .split(``)
    .reduce(
      (prev, char) => `${prev}${char === char.toUpperCase() ? ` ` : ``}${char}`,
      text[0].toUpperCase()
    )
}

export function isCustomProp(text: string) {
  return !isFirstUpperCase(text) && !keywords.includes(text)
}

export function openScene(scene: Any) {
  currentScene.value = scene
}

export function openMainScene() {
  setUp.value = true

  const scene = config.pathToMainScene
    .split(`.`)
    .slice(1)
    .reduce((prev, key) => prev[key], files.value)

  openScene(scene)
}

export function defaultGameObject({ position, rotation, scale, ...rest }: Any = {}) {
  return Object.keys(rest).reduce((prev, key) => ({ [key]: rest[key], ...prev }), {
    type: `gameObject`,
    transform: {
      position: position || { x: 0, y: 0 },
      rotation: rotation || 0,
      scale: scale || { x: 1, y: 1 },
    },
  })
}

export function capitalize(text: string) {
  return text.length === 0 || text[0] === text[0].toUpperCase()
    ? text
    : `${text[0].toUpperCase()}${text.slice(1)}`
}

export function isOccupied(obj: Any, name: string) {
  for (const key in obj) if (key === name) return true
  return false
}

// SaveFile
export function saveProject() {
  downloadFile(`${config.gameName}.virginengine`, JSON.stringify({ config, files: files.value }))
}

// LoadFile
function clearAssign(old: Any, obj: Any) {
  for (const key in old) delete old[key]
  for (const key in obj) old[key] = obj[key]
}

export function loadProject() {
  createElement({
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
      }

      reader.readAsText(target.files[0])
    },
  })
}

// Type
export function getType(data: any) {
  if (typeof data !== `string`) return typeof data as VTypes

  if (Array.isArray(data) || data[0] === `[`) return `array`
  if (data[0] === `{`) return `object`
  if (data.indexOf(`function`) === 0) return `function`
  if ([`"`, `'`, "`"].includes(data[0])) return `string`
  return `string`
}
