import { Signal } from "./Signal"
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
  `camera`,
]

export const config = {
  gameName: `Name of Game`,
  version: `0.0.0`,
  author: `Your Name or Nick`,
  description: `Write what game is`,
  fullScreen: false,
  pathToMainScene: `files.Scenes.DefaultScene`,
}

export const editor = {
  setUp: false,
}

const filesTemplate: Obj = {
  type: `folder`,
  Scenes: {
    type: `folder`,

    MenuScene: { type: `scene`, name: `MenuScene` },
    MainScene: { type: `scene`, name: `MainScene` },

    // Default Scene
    DefaultScene: {
      name: `DefaultScene`,
      type: `scene`,
      // camera: defaultGameObject({ camera: { width: 400, height: 300 } }),
      Parent: defaultGameObject({
        start: `function() {
  for(let i = 0; i < 10; i++)
    setTimeout(() => clone(this.parent.Child, scene))
}`,
      }),
      Child: defaultGameObject({
        scale: { x: 20, y: 20 },
        sprite: { color: `red`, imagePath: `` },
        start: `function() {
  this.position = {x: Math.random() * 1000, y: Math.random() * window.innerHeight}
  console.log("Start ".concat(this.position.x))
}`,
        update: `function() { console.log(this.position.x, this.name) }`,
      }),
    },
  },

  //Assets
  Assets: {
    type: `folder`,
    TempImage: {
      type: `image`,
      value: {
        src: `data:image/png;base64`,
        width: 1,
        height: 1,
      },
    },
  },
}

export const currentScene = new Signal<Obj>(filesTemplate.Scenes.MainScene)
export const inspector = new Signal<React.ReactNode>(null)
export const nameInput = new Signal<[((arg: string) => void)?, string?, boolean?]>([])
export const dragData = new Signal<Obj | null>(null)
export const testScene = new Signal(``)
export const files = new Signal<Obj>(filesTemplate)
export const contextMenu = new Signal<[number?, number?, ...any]>([])
