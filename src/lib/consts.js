import { defaultGameObject } from "./utils"

export const alphabet = `abcdefghijklmnoprqstuwxyz`
export const numbers = `0123456789`
export const allowedNameChars = `${alphabet}${numbers}_`

export const keywords = [
  `type`,
  `transform`,
  `position`,
  `rotation`,
  `scale`,
  `text`,
  `rect`,
  `sprite`,
  `camera`
]

export const config = {
  gameName: `Name of Game`,
  version: `0.0.0`,
  author: `Your Name or Nick`,
  description: `Write what game is`,
  fullScreen: false,
  //screenWidth: 1600,
  //screenHeight: 900,
  pathToMainScene: `files.Scenes.DefaultScene`
}

export const editor = {
  selectedScene: undefined,
  selectedSceneName: ``,
  setUp: false,
  dragData: undefined,

  reloadHierarchy: () => {},
  reloadFiles: () => {},
  setInspector: () => {},

  setDragData: () => {},
  setNameInput: () => {},
  setScene: () => {},
  setContextMenu: () => {}
}

export const files = {
  type: `folder`,
  Scenes: {
    type: `folder`,

    MenuScene: { type: `scene` },
    MainScene: { type: `scene` },

    // Default Scene
    DefaultScene: {
      type: `scene`,
      // camera: defaultGameObject({ camera: { width: 400, height: 300 } }),
      Parent: defaultGameObject({
        start: `function() {
  for(let i = 0; i < 10; i++)
    setTimeout(() => clone(this.parent.Child, scene))
}`
      }),
      Child: defaultGameObject({
        scale: { x: 20, y: 20 },
        sprite: { color: `red`, imagePath: `` },
        start: `function() {
  this.position = {x: Math.random() * 1000, y: Math.random() * window.innerHeight}
  console.log("Start ".concat(this.position.x))
}`,
        update: `function() { console.log(this.position.x, this.name) }`
      })
    }
  },

  //Assets
  Assets: {
    type: `folder`,
    TempImage: {
      type: `image`,
      value: {
        src: `data:image/png;base64`,
        width: 1,
        height: 1
      }
    }
  }
}
