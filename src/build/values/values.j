const canvas = document.body.children[0]
const ctx = canvas.getContext(`2d`)

const onresize = () => {
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight
}

window.addEventListener(`resize`, onresize)
onresize()

let scene = {}

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
