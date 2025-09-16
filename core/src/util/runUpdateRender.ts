import { Timer } from "@/values/classes"
import { ctx, events, gameObjects, GameTime, Log } from "../values/consts"
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
      Timer.reset()
    }

    await wait()
  }
}

// Update
function update() {
  UpdateTimer.measure([`Physics`, updatePhysics], [`Objects`, updateObjects])

  clearEvents()
}

function updatePhysics() {
  for (const obj of gameObjects) obj.physics?.update()
}

function updateObjects() {
  for (const obj of gameObjects) obj.update?.()
}

function clearEvents() {
  // Clear events, not eventsHover
  for (const key in events) delete events[key]
}

// Render
function render() {
  clearCtx()

  RenderTimer.measure([`Sprite`, renderSprite], [`Text`, renderText])

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
  for (const text of [...RenderTimer.allFormatted, ...UpdateTimer.allFormatted]) {
    drawText({ text, y, ...props })
    y += 18
  }

  // Recall render
  Log.framesTemp++
  requestAnimationFrame(render)
}

function clearCtx() {
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
}

function renderSprite() {
  for (const obj of gameObjects) obj.sprite?.render()
}

function renderText() {
  for (const obj of gameObjects) obj.text?.render()
}

const RenderTimer = new Timer([`Sprite`, `Text`])
const UpdateTimer = new Timer([`Physics`, `Objects`])
