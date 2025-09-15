import { drawText } from "../util/basicFunctions"

export default class Text implements TText {
  private gameObject

  value
  color

  private align = { x: 0, y: 0 }

  constructor({ value, color }: TextProps, gameObject: TGameObject) {
    this.gameObject = gameObject
    this.value = value
    this.color = color
  }

  render() {
    drawText({
      text: this.value,
      x: this.gameObject.position.x,
      y: this.gameObject.position.y,
      h: this.gameObject.scale.y,
      color: this.color,
      rect: this.gameObject.rect,
      align: this.align,
    })
  }

  get props() {
    return {
      value: this.value,
      color: this.color,
    }
  }
}
