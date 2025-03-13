// Update
const callUpdate = (obj) => {
  for (const f of obj.toUpdate) f()
  for (const child of obj.childs) callUpdate(child)
}

const update = () => {
  callUpdate(scene)

  // Clear events, not eventsHover
  for (const key in events) delete events[key]
}

// Render
const callRender = (obj) => {
  for (const f of obj.toRender) f()
  for (const child of obj.childs) callRender(child)
}

const render = () => {
  // clear
  ctx.fillStyle = `black`
  ctx.fillRect(0, 0, canvas.width, canvas.height)

  // all objects .render()
  callRender(scene)

  ctx.fillStyle = `white`
  ctx.font = `22px serif`

  ctx.fillText(`Update ${Log.updates}`, 10, 30)
  ctx.fillText(`Render ${Log.frames}`, 10, 60)

  // recall render
  Log.framesTemp++
  requestAnimationFrame(render)
}
