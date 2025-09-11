import { ctx, events, gameObjects, GameTime, Log } from "../values/values"
import { draw, loadScene, wait } from "./basicFunctions"

// Run
export async function run() {
  loadScene(`REPLACE_PATH_TO_MAIN_SCENE`)

  GameTime.set(1)
  requestAnimationFrame(render)

  let timer = performance.now()
  let updates = 0
  let delta = 0
  while (true) {
    const now = performance.now()
    delta += (now - GameTime.lastTime) / GameTime.ms
    if (delta > 60) delta = 60

    GameTime.lastTime = now
    while (delta >= 1) {
      update()
      updates++
      delta--
    }

    // Log Staff
    if (now - timer > 1000) {
      timer += 1000
      Log.updates = updates
      Log.frames = Log.framesTemp
      updates = 0
      Log.framesTemp = 0
    }

    await wait()
  }
}

// Update
function update() {
  for (const obj of gameObjects) {
    obj.update?.()
  }

  // Clear events, not eventsHover
  for (const key in events) delete events[key]
}

// Render
function render() {
  // Clear
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)

  // Render

  // Sprite
  for (const obj of gameObjects) obj.sprite?.render()

  // Text
  for (const obj of gameObjects) obj.text?.render()

  draw({
    text: `${gameObjects.length}go, ${Log.updates}ups, ${Log.frames}fps`,
    x: window.innerWidth - 6,
    y: 6,
    h: 18,
    fillStyle: `white`,
    textAlign: `right`,
    textBaseline: `top`,
  })

  // Recall render
  Log.framesTemp++
  requestAnimationFrame(render)
}
