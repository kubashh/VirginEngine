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
const callStart = (obj) => {
  obj.start?.()
  for (const child of obj.childs) {
    callStart(child)
  }
}

const start = () => {
  for (const key in events) {
    delete events[key]
  }
  for (const key in eventsHover) {
    delete eventsHover[key]
  }

  callStart(scene)
}
