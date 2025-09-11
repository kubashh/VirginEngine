import type GameObject from "./GameObject"
import { draw } from "../util/basicFunctions"

const textBaseline = [`top`, `middle`, `bottom`]
const textAlign = [`left`, `center`, `right`]

export default class Text implements TText {
  private gameObject

  value
  color

  textBaseline
  textAlign

  constructor({ value, color }: TextProps, gameObject: GameObject) {
    this.gameObject = gameObject
    this.value = value
    this.color = color

    if (gameObject.rect) {
      this.textBaseline = textBaseline[gameObject.rect.x]
      this.textAlign = textAlign[gameObject.rect.y]
    }
  }

  render() {
    draw({
      text: this.value,
      x: this.gameObject.position.x,
      y: this.gameObject.position.y,
      fillStyle: this.color,
      font: `${this.gameObject.scale.y}px serif`,
      textBaseline: this.textBaseline,
      textAlign: this.textAlign,
    })
  }

  get props() {
    return {
      value: this.value,
      color: this.color,
    }
  }
}
