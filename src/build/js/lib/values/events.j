let events = {}

window.addEventListener(`mousedown`, () => (events.mouseHover = true))
window.addEventListener(`mouseup`, () => (events.mouseHover = false))

window.addEventListener(`click`, () => (events.click = true))

window.addEventListener(`keydown`, ({ key }) => (events[key] = true))
