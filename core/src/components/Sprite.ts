import { draw } from "../util/basicFunctions"
import type { GameObject } from "./GameObject"

export class Sprite {
  gameObject: GameObject
  color: string

  constructor({ color }: { color: string }, gameObject: GameObject) {
    this.gameObject = gameObject
    this.color = color
    gameObject.toRender.push(this.render.bind(this))
  }

  render() {
    draw({
      x: this.gameObject.position.x,
      y: this.gameObject.position.y,
      w: this.gameObject.scale.x,
      h: this.gameObject.scale.y,
      color: this.color,
    })
  }
}
