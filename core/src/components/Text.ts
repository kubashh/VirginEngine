import type GameObject from "./GameObject"
import { draw } from "../util/basicFunctions"

const textBaseline = [`top`, `middle`, `bottom`]
const textAlign = [`left`, `center`, `right`]

export default class Text implements TText {
  value
  rect
  transform

  textBaseline
  textAlign

  constructor({ value }: { value: string }, gameObject: GameObject) {
    this.transform = gameObject.transform
    this.value = value
    if (gameObject.rect) {
      this.rect = gameObject.rect
      this.textBaseline = textBaseline[this.rect.x]
      this.textAlign = textAlign[this.rect.y]
    }
    gameObject.toRender.push(this.render.bind(this))
  }

  render() {
    draw({
      text: this.value,
      ...this.transform.position,
      fillStyle: `white`,
      font: `${this.transform.scale.y}px serif`,
      textBaseline: this.textBaseline,
      textAlign: this.textAlign,
    })
  }

  get props() {
    return {
      value: this.value,
    }
  }
}
