import { GameObject } from "../components/GameObject"
import { ctx, events, eventsHover, gameObjects, scene, setScene } from "../values/values"

// Time
export async function wait(time: number) {
  await new Promise((r) => setTimeout(r, time))
}

export async function wait0() {
  await new Promise((r) => setTimeout(r))
}

// Is child
export function isChildKey(text: string) {
  return `ABCDEFGHIJKLMNOPRQSTUWXYZ`.includes(text.at(0)!)
}

// Deep copy
export function deepCopy(data: any) {
  if (Array.isArray(data)) {
    return data.reduce((prev, val) => [...prev, deepCopy(val)], [])
  }

  if (typeof data === `object`) {
    const newObj: Obj<any> = {}

    for (const key in data) {
      newObj[key] = deepCopy(data[key])
    }

    return newObj
  }

  return data
}

// Clone
export function clone(obj: Obj<any>, parent: Obj<any>) {
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
export function loadScene({ name, ...newScene }: any) {
  // Clear gameObject array
  gameObjects.length = 0

  // Load Scene
  setScene(new GameObject(deepCopy(newScene)), name)

  // Start (Delete events)
  for (const key in events) delete events[key]
  for (const key in eventsHover) delete eventsHover[key]
}

// Set and draw on ctx (canvas)
export function draw({ text, color, x, y, w, h, ...props }: Obj<any>) {
  ctx.save()
  for (const key in props) {
    ;(ctx as any)[key] = props[key]
  }

  if (text) ctx.fillText(text, x, y)
  if (color) {
    ctx.fillStyle = color
    ctx.fillRect(x, y, w, h)
  }
  ctx.restore()
}

export function drawBoxMiddle(x: number, y: number, w: number, h: number, color: string) {
  if (color) ctx.fillStyle = color

  ctx.fillRect(x, y, w, h)
}
