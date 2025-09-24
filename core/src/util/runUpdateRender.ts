import { Timer } from "@/values/classes"
import { ctx, events, nodes, GameTime, Log } from "../values/consts"
import { drawText, loadScene, wait } from "./basicFunctions"

// Run
export async function run() {
  loadScene("REPLACE_PATH_TO_MAIN_SCENE" as any)

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
  updateTimer.measure([`Physics`, updatePhysics], [`Nodes`, updateNodes])

  // Clear events, not eventsHover
  events.clear()
}

function updatePhysics() {
  for (const node of nodes) node.physics?.update()
}

function updateNodes() {
  for (const node of nodes) node.update?.()
}

// Render
function render() {
  clearCtx()

  renderTimer.measure([`Sprite`, renderSprite], [`Text`, renderText])

  drawText({
    text: `${nodes.length}obj, ${Log.updates}ups, ${Log.frames}fps`,
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
  for (const text of [...renderTimer.allFormatted, ...updateTimer.allFormatted]) {
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
  for (const node of nodes) node.sprite?.render()
}

function renderText() {
  for (const node of nodes) node.text?.render()
}

const renderTimer = new Timer([`Sprite`, `Text`])
const updateTimer = new Timer([`Physics`, `Nodes`])
