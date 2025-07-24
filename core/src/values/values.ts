import type { GameObject } from "../components/GameObject"

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

  get() {
    return this.value
  },

  set(newTime: number) {
    this.value = newTime
    this.ms = 1000 / (60 * this.value)
    this.lastTime = performance.now()
  },
}

// Scene
export let scene: Obj<any> = {}

export function setScene(newScene: GameObject) {
  scene = newScene
}
