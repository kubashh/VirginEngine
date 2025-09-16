import { events, eventsHover, files } from "./values/consts"
import { onresize, randColor } from "./util/basicFunctions"
import { run } from "./util/runUpdateRender"

// EventListener

window.addEventListener(`mousedown`, () => (eventsHover.click = true))
window.addEventListener(`mouseup`, () => delete eventsHover.click)

window.addEventListener(`click`, () => (events.click = true))

window.addEventListener(`keydown`, ({ key }) => (events[key] = eventsHover[key] = true))
window.addEventListener(`keyup`, ({ key }) => delete eventsHover[key])

window.addEventListener(`contextmenu`, (e) => {
  e.preventDefault()

  !document.fullscreenElement ? document.documentElement.requestFullscreen() : document.exitFullscreen()
})

window.addEventListener(`resize`, onresize)

// Run

console.log(`Engine: ${!!files || randColor}`)
// console.clear()

onresize()

run()
