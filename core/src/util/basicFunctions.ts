import { allowedNameChars, alphabet, ctx, scene } from "../values/values"

// Time
export async function wait(time?: number) {
  await new Promise((r) => setTimeout(r, time))
}

// Is child
export function isChildKey(text: string) {
  return alphabet.includes(text.at(0)!)
}

// Deep copy
export function deepCopy(data: any) {
  if (Array.isArray(data)) {
    return data.reduce((prev, val) => [...prev, deepCopy(val)], [])
  }

  if (typeof data === `object`) {
    const newObj: Any = {}

    for (const key in data) {
      if ([`parent`, `toUpdate`, `toRender`, `gameObject`].includes(key)) continue
      newObj[key] = deepCopy(data[key])
    }

    return newObj
  }

  return data
}

// Load scene
export function loadScene({ name, ...newScene }: any) {
  scene.load(deepCopy(newScene), name)

  onresize()
}

// Set and draw on canvas
export function draw({ text, color, x, y, w, h, ...props }: Any) {
  ctx.save()
  for (const key in props) {
    ;(ctx as Any)[key] = props[key]
  }

  if (text) ctx.fillText(text, x, y)
  if (color) {
    ctx.fillStyle = color
    ctx.fillRect(x, y, w, h)
  }
  ctx.restore()
}

export function drawBoxMiddle(x: number, y: number, w: number, h: number, color: string) {
  draw({ x: x - w / 2, y: y - h / 2, w, h, color })
}

export function onresize() {
  ctx.canvas.width = window.innerWidth
  ctx.canvas.height = window.innerHeight

  // scene.camera = new GameObject({
  //   transform: {
  //     position: { x: window.innerWidth / 2, y: window.innerHeight / 2 },
  //   },
  // })
}

export function randInt(min: number, max?: number) {
  return Math.floor(rand(min, max))
}

export function rand(min: number = 1, max?: number) {
  return max ? Math.random() * (max - min) + min : Math.random() * min
}

export function randStr(n = 1) {
  let str = ``
  for (let i = 0; i < n; i++) {
    str += allowedNameChars.at(randInt(allowedNameChars.length))
  }
  return str
}

export function randColor() {
  return `#${randHex()}${randHex()}${randHex()}`
}

function randHex() {
  const n = randInt(16)
  return n < 10 ? String(n) : String.fromCharCode(45 + n)
}
