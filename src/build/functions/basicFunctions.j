// Time
const wait = async (time) => await new Promise((r) => setTimeout(r, time))
const wait0 = async () => new Promise((r) => setTimeout(r))

const now = () => window.performance.now()

// Is child
const isChildKey = (text) => `ABCDEFGHIJKLMNOPRQSTUWXYZ`.includes(text[0])

// Deep copy
const deepCopy = (data) => {
  if (typeof data === `function`) return data

  if (Array.isArray(data)) {
    return data.reduce((old, val) => [...old, deepCopy(val)], [])
  }

  if (typeof data === `object`) {
    const newObj = {}

    for (const key in data) {
      newObj[key] = deepCopy(data[key])
    }

    return newObj
  }

  return data
}

// Load scene
const loadScene = (newScene) => {
  scene = new GameObject(deepCopy(newScene))
  start()
}

// Set and draw on ctx (canvas)
const draw = ({ text, x, y, ...props }) => {
  ctx.save()
  for (const key in props) {
    ctx[key] = props[key]
  }

  if (text) ctx.fillText(text, x, y)
  ctx.restore()
}
