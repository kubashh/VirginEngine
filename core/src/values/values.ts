import GameObject from "../components/GameObject"

// Canvas
export const ctx = (document.body.children[0] as HTMLCanvasElement).getContext(`2d`)!

// Files
export const files = `REPLACE_FILES`

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
export let scene = {}
export const Scene: Any = {
  objects: [],
  name: ``,

  load(newScene: Any, name: string) {
    // Clear gameObject array
    gameObjects.length = 0

    // Clear events
    for (const key in events) delete events[key]
    for (const key in eventsHover) delete eventsHover[key]

    this.close()
    this.name = name

    scene = new GameObject({ ...newScene, parent: {} })
  },

  close() {
    this.objects.length = 0
    for (const key in this) {
      if (![`name`, `objects`, `load`, `close`].includes(key)) delete this[key]
    }
  },
}
