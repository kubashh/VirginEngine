import { GameObject } from "../components/GameObject"
import { ctx, events, eventsHover, gameObjects, scene, setScene } from "../values/values"

// Time
export async function wait(time?: number) {
  await new Promise((r) => setTimeout(r, time))
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
  // Clear gameObject array
  gameObjects.length = 0

  // Clear events
  for (const key in events) delete events[key]
  for (const key in eventsHover) delete eventsHover[key]

  // Load Scene
  setScene(new GameObject(deepCopy(newScene)))
  scene.name = name

  onresize()
}

// Set and draw on ctx (canvas)
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
  if (color) ctx.fillStyle = color

  ctx.fillRect(x, y, w, h)
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
