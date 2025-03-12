let updatesLegit = 0
let framesLegit = 0

const GameTime = {
  ms: 100,
  value: 1,
  lastTime: now(),

  get: () => {
    return GameTime.value
  },

  set: (newTime) => {
    GameTime.value = newTime
    GameTime.ms = 1000 / (60 * GameTime.value)
    GameTime.lastTime = now()
  }
}

// TODO as LOG object const Log = { updates: 0, frames: 0 }

GameTime.set(1)

let frames = 0
const run = async () => {
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
      updatesLegit = updates
      framesLegit = frames
      updates = 0
      frames = 0
    }

    await wait0()
  }
}
