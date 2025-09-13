import { allowedNameChars, alphabet, ctx, files, scene } from "../values/values"

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

  if (rect.x === 0) x += window.innerWidth / 2
  if (rect.x === 1) x += window.innerWidth
  if (rect.y === 0) y += window.innerHeight / 2
  if (rect.y === 1) y += window.innerHeight

  for (const key in rest) {
    ;(ctx as Any)[key] = (rest as Any)[key]
  }

  ctx.font = `${h}px ${font}`
  ctx.fillText(text, x, y, w)

  ctx.restore()
}

export function drawImage(img: CanvasImageSource, pos: XY, rot: number, scl: XY) {
  ctx.save()
  // ctx.scale(scl.x, scl.y)
  ctx.drawImage(img, pos.x, pos.y)
  ctx.restore()
}

// function drawBoxMiddle(x: number, y: number, w: number, h: number, color: string) {
//   draw({ x: x - w / 2, y: y - h / 2, w, h, color })
// }

export function file(path: string) {
  return path
    .split(`.`)
    .slice(1)
    .reduce((prev, key) => prev[key], files as any)
}

export function onresize() {
  ctx.canvas.width = window.innerWidth
  ctx.canvas.height = window.innerHeight
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
