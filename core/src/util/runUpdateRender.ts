import { ctx, events, gameObjects, GameTime, Log } from "../values/values"
import { drawText, loadScene, wait } from "./basicFunctions"

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

function counter(f: Void) {
  const start = performance.now()
  f()
  return performance.now() - start
}

function renderSprite() {
  for (const obj of gameObjects) obj.sprite?.render()
}

function renderText() {
  for (const obj of gameObjects) obj.text?.render()
}

// Render
function render() {
  // Clear
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)

  // Render
  const timeSprite = counter(renderSprite)
  const timeText = counter(renderText)

  drawText({
    text: `${gameObjects.length}go, ${Log.updates}ups, ${Log.frames}fps`,
    x: -6,
    y: 6,
    h: 18,
    rect: { x: 1, y: -1 },
    color: `white`,
    textAlign: `right`,
    textBaseline: `top`,
  })

  const props = {
    x: 6,
    y: 6,
    h: 18,
    rect: { x: -1, y: -1 },
    color: `white`,
    textAlign: `left`,
    textBaseline: `top`,
  }

  drawText({ text: `Sprite: ${timeSprite}ms`, ...props })
  drawText({ text: `Text: ${timeText}ms`, ...props, y: props.y + 18 })

  // Recall render
  Log.framesTemp++
  requestAnimationFrame(render)
}
