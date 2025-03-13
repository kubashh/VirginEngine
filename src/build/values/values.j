// Canvas
const canvas = document.body.children[0]
const ctx = canvas.getContext(`2d`)

const onresize = () => {
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight
}

window.addEventListener(`resize`, onresize)
onresize()

// Scene
let scene = {}

// Events
const events = {}
const eventsHover = {}

window.addEventListener(`mousedown`, () => (eventsHover.click = true))
window.addEventListener(`mouseup`, () => delete eventsHover.click)

window.addEventListener(`click`, () => (events.click = true))

window.addEventListener(
  `keydown`,
  ({ key }) => (events[key] = eventsHover[key] = true)
)
window.addEventListener(`keyup`, ({ key }) => delete eventsHover[key])

window.addEventListener(`contextmenu`, (e) => {
  e.preventDefault()

  !document.fullscreenElement
    ? document.documentElement.requestFullscreen()
    : document.exitFullscreen()
})

// GameTime
const GameTime = {
  ms: 1,
  value: 1,
  lastTime: 0,

  get: () => {
    return GameTime.value
  },

  set: (newTime) => {
    GameTime.value = newTime
    GameTime.ms = 1000 / (60 * GameTime.value)
    GameTime.lastTime = now()
  }
}

// Log
const Log = { updates: 0, frames: 0, framesTemp: 0 }

// To start
const toStart = []
