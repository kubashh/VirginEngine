import { signal } from "./signals"
import { defaultGameObject } from "./utils"

export const alphabet = `abcdefghijklmnoprqstuwxyz`
export const numbers = `0123456789`
export const allowedNameChars = `${alphabet}${numbers}_`

export const keywords = [`type`, `transform`, `position`, `rotation`, `scale`, `text`, `rect`, `sprite`]

export const conf = {
  gameName: `NameOfGame`,
  version: `0.0.0`,
  author: `YourNick`,
  description: `Description`,
  fullScreen: false,
  pathToMainScene: `files.Scenes.DefaultScene`,
}

const filesTemplate: Any = {
  type: `folder`,
  Scenes: {
    type: `folder`,

    MenuScene: { type: `scene`, name: `MenuScene` },
    MainScene: { type: `scene`, name: `MainScene` },

    // Default Scene
    DefaultScene: {
      name: `DefaultScene`,
      type: `scene`,
      // camera: { scale: 1, aspectRatio: 1, x: 0, y: 0 },
      Parent: defaultGameObject({
        start: `function() {
  for(let i = 0; i < 1000; i++)
    setTimeout(() => this.parent.Child.clone(scene))
}`,
      }),
      Child: defaultGameObject({
        scale: { x: 20, y: 20 },
        sprite: { color: `#974`, imagePath: `` },
        start: `function() {
  this.position = {x: Math.random() * window.innerWidth, y: Math.random() * window.innerHeight}
}`,
        update: `function() {
  const x = this.position.x - 1
  this.position = {x: x < 0 ? window.innerWidth : x, y: this.position.y}
}`,
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

export const currentScene = signal<Any>(filesTemplate.Scenes.MainScene)
export const inspector = signal<React.ReactNode>(null)
export const nameInput = signal<[((arg: string) => void)?, string?, boolean?]>([])
export const dragData = signal<Any | null>(null)
export const testScene = signal(``)
export const files = signal<Any>(filesTemplate)
export const contextMenu = signal<[number?, number?, ...any]>([])
export const setUp = signal(false)

if (typeof window !== `undefined`) window.oncontextmenu = (e) => e.preventDefault()
