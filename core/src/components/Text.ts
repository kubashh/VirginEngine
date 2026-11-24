import { drawText } from "../util/basicFunctions";
import type { Node } from "./Node";

export class Text {
  private node: Node;

  value: string;
  color: string;
  fontSize: number;

  private align = { x: 0, y: 0 };

  constructor({ value, color, fontSize }: TextProps, node: Node) {
    this.node = node;
    this.value = value;
    this.color = color;
    this.fontSize = fontSize;
  }

  render() {
    drawText({
      text: this.value,
      x: this.node.position.x,
      y: this.node.position.y,
      fontSize: this.fontSize, // TODO scale text
      color: this.color,
      rect: this.node.rect,
      align: this.align,
    });
  }

  getProps() {
    return {
      value: this.value,
      color: this.color,
    };
  }
}

export type TextProps = { value: string; color: string; fontSize: number };
