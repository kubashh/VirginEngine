import { signal } from "./signals"
import { defaultGameObject } from "./utils"

export const alphabet = `abcdefghijklmnoprqstuwxyz`
export const numbers = `0123456789`
export const allowedNameChars = `${alphabet}${numbers}_`

export const keywords = [`type`, `transform`, `position`, `rotation`, `scale`, `text`, `rect`, `sprite`]

export const conf = {
  gameName: `Name of Game`,
  version: `0.0.0`,
  author: `Your Nick`,
  description: `Description`,
  fullScreen: false,
  pathToMainScene: `files.Scenes.DefaultScene`,
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
    ExampleImage: {
      type: `image`,
      value: {
        src: `data:image/png;base64`,
        width: 1,
        height: 1,
      },
    },
  },
}

export const currentScene = signal<Obj>(filesTemplate.Scenes.MainScene)
export const inspector = signal<React.ReactNode>(null)
export const nameInput = signal<[((arg: string) => void)?, string?, boolean?]>([])
export const dragData = signal<Obj | null>(null)
export const testScene = signal(``)
export const files = signal<Obj>(filesTemplate)
export const contextMenu = signal<[number?, number?, ...any]>([])
export const setUp = signal(false)

if (typeof window !== `undefined`) window.oncontextmenu = (e) => e.preventDefault()
