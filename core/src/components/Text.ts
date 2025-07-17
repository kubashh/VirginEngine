import { draw } from "../functions/basicFunctions"
import type { GameObject } from "./GameObject"

export class Text {
  value: string
  rect: XY | undefined
  transform

  textBaseline
  textAlign

  constructor(value: string, gameObject: GameObject, rect: XY) {
    this.transform = gameObject.transform
    this.value = value
    this.textBaseline = Text.textBaseline[rect.x]
    this.textAlign = Text.textAlign[rect.y]
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

  static textBaseline = [`top`, `middle`, `bottom`]
  static textAlign = [`left`, `center`, `right`]
}
