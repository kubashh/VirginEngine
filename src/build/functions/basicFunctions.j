// Time
const wait = async (time) => await new Promise((r) => setTimeout(r, time))
const wait0 = async () => new Promise((r) => setTimeout(r))

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
  // Clear gameObject array
  gameObjects.length = 0

  // Load Scene
  scene = new GameObject(deepCopy(newScene))

  // Start (Delete events)
  for (const key in events) delete events[key]
  for (const key in eventsHover) delete eventsHover[key]
}

// Set and draw on ctx (canvas)
const draw = ({ text, color, x, y, w, h, ...props }) => {
  ctx.save()
  for (const key in props) {
    ctx[key] = props[key]
  }

  if (text) ctx.fillText(text, x, y)
  if (color) {
    ctx.fillStyle = color
    ctx.fillRect(x, y, w, h)
  }
  ctx.restore()
}

const drawBoxMiddle = (x, y, w, h, color) => {
  if (color) {
    ctx.fillStyle = color
  }

  ctx.fillRect(x, y, w, h)
}
