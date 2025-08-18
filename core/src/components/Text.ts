import type GameObject from "./GameObject"
import { draw } from "../util/basicFunctions"

const textBaseline = [`top`, `middle`, `bottom`]
const textAlign = [`left`, `center`, `right`]

export default class Text {
  value: string
  rect?: XY
  transform

  textBaseline
  textAlign

  constructor(value: string, gameObject: GameObject, rect: XY) {
    this.transform = gameObject.transform
    this.value = value
    this.textBaseline = textBaseline[rect.x]
    this.textAlign = textAlign[rect.y]
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
      rect: this?.rect,
      textBaseline: this.textBaseline,
      textAlign: this.textAlign,
    }
  }
}
