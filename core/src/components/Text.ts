import { drawText } from "../util/basicFunctions";
import type { Node } from "./Node";

export class Text implements TText {
  private node;

  value;
  color;

  private align = { x: 0, y: 0 };

  constructor({ value, color }: TextProps, node: Node) {
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

type TText = {
  value: string;
  color: string;

  textBaseline?: string;
  textAlign?: string;

  render: () => void;

  props: {
    value: string;
  };
};
