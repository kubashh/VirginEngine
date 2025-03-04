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
  `camera`
]

export const config = {
  type: `config`,
  gameName: `Name of Game`,
  screenWidth: 1600,
  screenHeight: 900,
  fullScreen: true,
  safeUnload: false,
  version: `0.0.0`,
  author: `Your Name or Nick`,
  description: `Write what game is`,
  pathToMainScene: `Scenes.DefaultScene`
}

export const editor = {
  width: window.innerWidth,
  height: window.innerHeight,
  selectedField: `none`,
  selectedScene: ``
}

export const files = {
  type: `folder`,
  Scenes: {
    type: `folder`,

    // Default Scene
    DefaultScene: {
      type: `scene`,
      Camera: {
        ...defaultGameObject(),
        camera: {
          width: 400,
          height: 300
        }
      },
      Obj1: {
        ...defaultGameObject()
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
  },

  // Other Files
  Folder1: {
    type: `folder`,
    Obj1: {
      type: `text`,
      value: `str 2`
    },
    Obj2: {
      type: `folder`,
      Obj3: {
        type: `text`,
        value: `str 3`
      }
    }
  }
}
