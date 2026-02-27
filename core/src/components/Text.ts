import { drawText } from "../util/basicFunctions";

export default class Text implements TText {
  private node;

  value;
  color;

  private align = { x: 0, y: 0 };

  constructor({ value, color }: TextProps, node: TNode) {
    this.node = node;
    this.value = value;
    this.color = color;
  }

  render() {
    drawText({
      text: this.value,
      x: this.node.position.x,
      y: this.node.position.y,
      h: this.node.scale.y,
      color: this.color,
      rect: this.node.rect,
      align: this.align,
    });
  }

  get props() {
    return {
      value: this.value,
      color: this.color,
    };
  }
}
