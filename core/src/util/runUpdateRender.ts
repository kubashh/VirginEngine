import { ctx, events, gameObjects, GameTime, Log } from "../values/values"
import { draw, wait } from "./basicFunctions"

// Run
export async function run() {
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
    for (const f of obj.toUpdate) f()
  }

  // Clear events, not eventsHover
  for (const key in events) delete events[key]
}

// Render
function render() {
  // clear
  ctx.fillStyle = `black`
  ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height)

  // all objects .render()
  for (const obj of gameObjects) {
    for (const f of obj.toRender) f()
  }

  const props = {
    x: 8,
    y: 8,
    fillStyle: `white`,
    font: `22px serif`,
    textAlign: `left`,
    textBaseline: `top`,
  }

  draw({ text: `Update ${Log.updates}`, ...props })
  draw({ text: `Render ${Log.frames}`, ...props, y: 38 })

  // recall render
  Log.framesTemp++
  requestAnimationFrame(render)
}
