import type GameObject from "./GameObject"

export default class Rect {
  gameObject
  x
  y

  constructor({ x, y }: XY, gameObject: GameObject) {
    this.gameObject = gameObject

    this.x = x
    this.y = y
  }
}
