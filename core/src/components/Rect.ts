import type GameObject from "./GameObject"

export default class Rect {
  gameObject
  x
  y

  constructor({ rect }: { rect: XY }, gameObject: GameObject) {
    this.gameObject = gameObject

    this.x = rect.x
    this.y = rect.y
  }
}
