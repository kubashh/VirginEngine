import GameObject from "../components/GameObject"

// Canvas
export const ctx = (document.body.children[0] as HTMLCanvasElement).getContext(`2d`)!

// Files
export const files = `REPLACE_FILES`

// Alphabet
export const alphabet = `ABCDEFGHIJKLMNOPRQSTUWXYZ`
export const numbers = `0123456789`
export const allowedNameChars = `${alphabet}${numbers}_`

// Events
export const events: Obj<boolean> = {}
export const eventsHover: Obj<boolean> = {}

// gameObjects
export const gameObjects: GameObject[] = []

// Log
export const Log = { updates: 0, frames: 0, framesTemp: 0 }

// GameTime
export const GameTime = {
  ms: 1,
  value: 1,
  lastTime: 0,

  set(newTime: number) {
    this.value = newTime
    this.ms = 1000 / (60 * this.value)
    this.lastTime = performance.now()
  },
}

// Scene
class Scene extends GameObject {
  camera = { x: 0, y: 0 }

  constructor(scene: any, name: string) {
    super(scene, name)
  }

  load(newScene: Any, name: string) {
    this.close()

    scene = new Scene(newScene, name)

    for (const object of gameObjects) {
      object.start?.()
    }
  }

  close() {
    super.destroy()

    // Clear gameObject array
    gameObjects.length = 0

    // Clear events
    for (const key in events) delete events[key]
    for (const key in eventsHover) delete eventsHover[key]

    for (const key in this) {
      if (![`name`, `objects`, `load`, `close`].includes(key)) delete this[key]
    }
  }
}

export let scene = new Scene({}, ``)
