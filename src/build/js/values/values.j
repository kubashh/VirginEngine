const canvas = document.body.children[0]
const ctx = canvas.getContext(`2d`)

const setWidthHeightCanvas = () => {
  width = window.innerWidth
  height = window.innerHeight
  canvas.width = width
  canvas.height = height
}

window.addEventListener(`resize`, setWidthHeightCanvas)
setWidthHeightCanvas()

let currentScene = {}

let events = {}

window.addEventListener(`mousedown`, () => (events.mouseHover = true))
window.addEventListener(`mouseup`, () => (events.mouseHover = false))

window.addEventListener(`click`, () => (events.click = true))

window.addEventListener(`keydown`, ({ key }) => (events[key] = true))

window.addEventListener(`contextmenu`, (e) => {
  e.preventDefault()

  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen()
  } else if (document.exitFullscreen) {
    document.exitFullscreen()
  }
})
