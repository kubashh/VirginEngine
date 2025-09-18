import Node from "@/components/Node"
import { events, eventsHover, nodes } from "./consts"

export class Scene extends Node implements TScene {
  camera = { x: 0, y: 0 }

  constructor(scene: any, name: string) {
    super(scene, name)
  }

  load(newScene: Any, name: string) {
    this.close()

    newScene = new Scene(newScene, name)

    for (const key in newScene) {
      ;(this as TScene)[key] = newScene[key]
    }

    for (const node of nodes) node.start?.()

    // Remove Scene from nodes
    nodes.shift()
  }

  close() {
    super.destroy()

    nodes.length = 0

    events.clear()
    eventsHover.clear()

    // Clear scene
    for (const key in this) delete this[key]
  }
}

export class Timer {
  timers
  allFormatted = [] as string[]
  static timers = [] as Timer[]

  constructor(labels: string[]) {
    this.timers = labels.reduce((prev, str) => ({ ...prev, [str]: 0 }), {} as TObj<number>)
    this.reset()
    Timer.timers.push(this)
  }

  measure(...arr: [string, Void][]) {
    const timer = this.timers

    for (const [name, f] of arr) {
      const start = performance.now()
      f()
      const end = performance.now() - start
      if (!this.timers[name]) this.timers[name] = 0
      timer[name] += end
    }
  }

  reset() {
    const obj = Object.entries(this.timers).reduce(
      (prev, [key, v]) => ({ ...prev, [key]: (prev[key] || 0) + v }),
      {} as TObj<number>
    )

    const all = Object.values(obj).reduce((prev, v) => prev + v, 0)
    this.allFormatted = Object.entries(obj).map(
      ([key, value]) => `${key}: ${((value * 100) / all || 0).toFixed(2)}%`
    )

    this.timers = {}
  }

  static reset() {
    for (const timer of this.timers) {
      timer.reset()
    }
  }
}

export class Obj {
  constructor(obj?: Object) {
    Object.assign(this, obj)
  }

  clear() {
    for (const key in this) delete this[key]
  }
}
