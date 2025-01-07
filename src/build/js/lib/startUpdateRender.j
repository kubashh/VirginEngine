let gameTime = 1

const wait = async (time) => await new Promise(resolve => setTimeout(resolve, time))
const wait0 = async () => new Promise(resolve => setTimeout(resolve))

const now = () => window.performance.now()

timers = {
  update: {
    gravity: 0,
    user: 0,
    all: 0
  }
}

const update = () => {
}

const render = () => {
  console.log(`Update ${updatesLegit}`)
  console.log(`Render ${framesLegit}`)
}

let ms = 1000 / 60 / gameTime
let updatesLegit = 0
let framesLegit = 0

const setGameTime = (newTime) => {
  ms = 1000 / 60 / newTime
  let lastTime = now()
}

const run = async () => {
  let lastTime = now()
  let timer = now()
  let frames = 0
  let updates = 0
  let delta = 0
  while(true) {
    const nowVar = now()
    delta += (nowVar - lastTime) / ms
    if(delta > 60) {
      delta = 60
    }
    lastTime = nowVar
    while(delta >= 1) {
      update()
      updates++
      delta--
    }
    render()
    frames++

    if(now() - timer > 1000) {
      timer += 1000
      updatesLegit = updates
      framesLegit = frames
      updates = 0
      frames = 0
    }

    await wait0()
  }
}

run()