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

// Render
function render() {
  // Clear
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)

  // Render
  Timer.measure([`Sprite`, renderSprite], [`Text`, renderText])

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
    h: 18,
    rect: { x: -1, y: -1 },
    color: `white`,
    textAlign: `left`,
    textBaseline: `top`,
  }

  let y = 6
  for (const text of Timer.getAllFormatted()) {
    drawText({ text, y, ...props })
    y += 18
  }

  // Recall render
  Log.framesTemp++
  requestAnimationFrame(render)
}

function renderSprite() {
  for (const obj of gameObjects) obj.sprite?.render()
}

function renderText() {
  for (const obj of gameObjects) obj.text?.render()
}

const Timer = {
  maxBuffer: 10,
  timers: [{}] as Obj<number>[],

  measure(...arr: [string, Void][]) {
    const timer = {} as Obj<number>

    for (const [name, f] of arr) {
      const start = performance.now()
      f()
      timer[name] = performance.now() - start
    }

    this.timers.push(timer)
    if (this.timers.length >= this.maxBuffer) this.timers.shift()
  },

  getAllFormatted() {
    const obj = this.timers.reduce((prev, v) =>
      Object.entries(v).reduce((prev, [key, v]) => ({ ...prev, [key]: (prev[key] || 0) + v }), prev)
    )

    const all = Object.values(obj).reduce((prev, v) => prev + v, 0)
    return Object.entries(obj).map(([key, value]) => `${key}: ${((value * 100) / all || 0).toFixed(2)}%`)
  },

  reset() {
    this.timers.length = 0
  },
}
