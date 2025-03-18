// Run
const run = async () => {
  GameTime.set(1)
  requestAnimationFrame(render)

  let timer = now()
  let updates = 0
  let delta = 0
  while (true) {
    const nowTime = now()
    delta += (nowTime - GameTime.lastTime) / GameTime.ms
    if (delta > 60) {
      delta = 60
    }
    GameTime.lastTime = nowTime
    while (delta >= 1) {
      update()
      updates++
      delta--
    }

    if (now() - timer > 1000) {
      timer += 1000
      Log.updates = updates
      Log.frames = Log.framesTemp
      updates = 0
      Log.framesTemp = 0
    }

    await wait0()
  }
}

// Start
const start = () => {
  // Delete events
  for (const key in events) delete events[key]
  for (const key in eventsHover) delete eventsHover[key]
}

// Update
const update = () => {
  for (const obj of gameObjects) {
    for (const f of obj.toUpdate) f()
  }

  // Clear events, not eventsHover
  for (const key in events) delete events[key]
}

// Render
const render = () => {
  // clear
  ctx.fillStyle = `black`
  ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height)

  // all objects .render()
  for (const obj of gameObjects) {
    for (const f of obj.toRender) f()
  }

  ctx.fillStyle = `white`
  ctx.font = `22px serif`
  ctx.textAlign = `left`
  ctx.textBaseline = `bottom`

  ctx.fillText(`Update ${Log.updates}`, 10, 30)
  ctx.fillText(`Render ${Log.frames}`, 10, 60)

  // recall render
  Log.framesTemp++
  requestAnimationFrame(render)
}
