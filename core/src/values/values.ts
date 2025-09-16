import GameObject from "../components/GameObject"
import { Scene } from "./classes"

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

export const Camera = {
  xOffset: 0,
  yOffset: 0,
}

export let scene = new Scene({}, ``)
