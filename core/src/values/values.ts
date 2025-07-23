import type { GameObject } from "../components/GameObject"

// Canvas
export const ctx = (document.body.children[0] as HTMLCanvasElement).getContext(`2d`)!

export const files = `REPLACE_FILES`

// Scene
export let scene: Obj<any> = {}

export function setScene(newScene: GameObject, name: string) {
  scene = newScene
  scene.name = name
}

// Events
export const events: Obj<boolean> = {}
export const eventsHover: Obj<boolean> = {}

// GameTime
export const GameTime = {
  ms: 1,
  value: 1,
  lastTime: 0,

  get() {
    return GameTime.value
  },

  set(newTime: number) {
    GameTime.value = newTime
    GameTime.ms = 1000 / (60 * GameTime.value)
    GameTime.lastTime = performance.now()
  },
}

// Log
export const Log = { updates: 0, frames: 0, framesTemp: 0 }

// gameObjects
export const gameObjects: GameObject[] = []
