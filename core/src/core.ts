import { ctx, events, eventsHover, files } from "./values/values"
import { loadScene } from "./functions/basicFunctions"
import { run } from "./functions/runUpdateRender"

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

function onresize() {
  ctx.canvas.width = window.innerWidth
  ctx.canvas.height = window.innerHeight
}

window.addEventListener(`resize`, onresize)

// Run

console.log(`Engine:`, !!files)
// console.clear()

onresize()

loadScene(`REPLACE_PATH_TO_MAIN_SCENE`)

run()

// document.body.children[1].remove()`
