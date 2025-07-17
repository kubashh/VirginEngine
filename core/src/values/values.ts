import type { GameObject } from "../components/GameObject"

// Canvas
export const ctx = (document.body.children[0] as HTMLCanvasElement).getContext(`2d`)!

function onresize() {
  ctx.canvas.width = window.innerWidth
  ctx.canvas.height = window.innerHeight
}

window.addEventListener(`resize`, onresize)
onresize()

export const files = `REPLACE_FILES`
console.log(files)

// Scene
export let scene: Obj<any> = {}

export function setScene(newScene: GameObject, name: string) {
  scene = newScene
  scene.name = name
}

// Events
export const events: Obj<boolean> = {}
export const eventsHover: Obj<boolean> = {}

window.addEventListener(`mousedown`, () => (eventsHover.click = true))
window.addEventListener(`mouseup`, () => delete eventsHover.click)

window.addEventListener(`click`, () => (events.click = true))

window.addEventListener(`keydown`, ({ key }) => (events[key] = eventsHover[key] = true))
window.addEventListener(`keyup`, ({ key }) => delete eventsHover[key])

window.addEventListener(`contextmenu`, (e) => {
  e.preventDefault()

  !document.fullscreenElement ? document.documentElement.requestFullscreen() : document.exitFullscreen()
})

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

// Arrays
export const gameObjects: GameObject[] = []
