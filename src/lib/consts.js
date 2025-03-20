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
  `camera`
]

export const config = {
  gameName: `Name of Game`,
  version: `0.0.0`,
  author: `Your Name or Nick`,
  description: `Write what game is`,
  //fullScreen: false,
  //screenWidth: 1600,
  //screenHeight: 900,
  pathToMainScene: `files.Scenes.DefaultScene`
}

export const editor = {
  selectedScene: undefined,
  selectedSceneName: ``,
  reloadApp: undefined,
  reloadHierarchy: undefined,
  reloadFiles: undefined,
  setInspector: undefined,
  setDragData: undefined
}

export const files = {
  type: `folder`,
  Scenes: {
    type: `folder`,

    // Default Scene
    DefaultScene: {
      type: `scene`,
      //camera: {
      //  ...defaultGameObject(),
      //  camera: { width: 400, height: 300 }
      //},
      Update: {
        ...defaultGameObject({
          position: { x: 0, y: 200 },
          scale: { x: 130, y: 30 }
        }),
        rect: { x: 0, y: 0 },
        text: { value: `update` },
        render: `function () {
          this.text.text = "Update ".concat(Log.updates)
        }`
      },
      Obj1: {
        ...defaultGameObject(),
        start: `function() { console.log("Start") }`
      }
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
