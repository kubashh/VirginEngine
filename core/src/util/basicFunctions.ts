import { allowedNameChars, alphabet, Camera, ctx, files, nodes, scene } from "../values/consts"

// Time
export async function wait(time?: number) {
  await new Promise((r) => setTimeout(r, time))
}

// Is child
export function isChildKey(text: string) {
  return alphabet.includes(text.at(0)!)
}

// Deep copy
export function deepCopy<T>(data: T): T {
  if (Array.isArray(data)) {
    return data.reduce((prev, val) => [...prev, deepCopy(val)], [])
  }

  if (typeof data === `object`) {
    const newObj: any = {}

    for (const key in data) {
      if ([`parent`, `toUpdate`, `toRender`, `node`].includes(key)) continue
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

// Draw on canvas

const textBaseline: Obj<string> = { "-1": `top`, "0": `middle`, "1": `bottom` }
const textAlign: Obj<string> = { "-1": `left`, "0": `center`, "1": `right` }

export function drawText({
  text,
  color,
  x,
  y,
  w,
  h,
  rect = { x: 0, y: 0 },
  font = `serif`,
  align,
  ...rest
}: drawTextProps) {
  ctx.save()

  ctx.fillStyle = color

  if (align) {
    ctx.textAlign = textAlign[align.x] as any
    ctx.textAlign = textBaseline[align.y] as any
  }

  x += Camera.xOffset
  y += Camera.yOffset

  if (rect.x === -1) x -= Camera.xOffset
  if (rect.x === 1) x += Camera.xOffset
  if (rect.y === -1) y -= Camera.yOffset
  if (rect.y === 1) y += Camera.yOffset

  for (const key in rest) {
    ;(ctx as Any)[key] = (rest as Any)[key]
  }

  ctx.font = `${h}px ${font}`
  ctx.fillText(text, x, y, w)

  ctx.restore()
}

export function file(path: string) {
  return path
    .split(`.`)
    .slice(1)
    .reduce((prev, key) => prev[key], files as any)
}

export function onresize() {
  ctx.canvas.width = window.innerWidth
  ctx.canvas.height = window.innerHeight
  Camera.xOffset = window.innerWidth * 0.5
  Camera.yOffset = window.innerHeight * 0.5

  // Resize sprites staticDrawProps
  for (const obj of nodes) {
    obj.sprite?.resize()
  }
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
