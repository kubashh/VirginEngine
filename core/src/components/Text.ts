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
    gameObject.toRender.push(this.render.bind(this))
  }

  render() {
    draw({
      text: this.value,
      ...this.gameObject.position,
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
