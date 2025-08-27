import type GameObject from "./GameObject"

export default class Rect {
  x
  y

  constructor({ x, y }: XY) {
    this.x = x
    this.y = y
  }

  get props() {
    return {
      x: this.x,
      y: this.y,
    }
  }
}
