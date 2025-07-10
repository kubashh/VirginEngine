// Time
async function wait(time) {
  await new Promise((r) => setTimeout(r, time))
}

async function wait0() {
  await new Promise((r) => setTimeout(r))
}

// Is child
function isChildKey(text) {
  return `ABCDEFGHIJKLMNOPRQSTUWXYZ`.includes(text[0])
}

// Deep copy
function deepCopy(data) {
  if (Array.isArray(data)) {
    return data.reduce((prev, val) => [...prev, deepCopy(val)], [])
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

// Clone
function clone(obj, parent) {
  const name = obj.name

  let newName = name
  let i = 0
  while (parent[newName]) {
    newName = `${name}${i}`
    i++
  }

  parent[newName] = new GameObject({ ...obj.props, parent })
}

// Load scene
function loadScene({ name, ...newScene }) {
  // Clear gameObject array
  gameObjects.length = 0

  // Load Scene
  scene = new GameObject(deepCopy(newScene))
  scene.name = name

  // Start (Delete events)
  for (const key in events) delete events[key]
  for (const key in eventsHover) delete eventsHover[key]
}

// Set and draw on ctx (canvas)
function draw({ text, color, x, y, w, h, ...props }) {
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

function drawBoxMiddle(x, y, w, h, color) {
  if (color) ctx.fillStyle = color

  ctx.fillRect(x, y, w, h)
}
