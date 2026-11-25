import { drawText } from "../util/basicFunctions";
import type { Node } from "./Node";

export class Text {
  private node: Node;

  value: string;
  color: string;
  fontSize: number;
  textAlign: `left` | `center` | `right`;
  textBaseline: `bottom` | `middle` | `top`;

  constructor(props: TextProps, node: Node) {
    this.node = node;
    this.value = props.value;
    this.color = props.color;
    this.fontSize = props.fontSize;
    this.textAlign = props.textAlign;
    this.textBaseline = props.textBaseline;
  }

  render() {
    drawText({
      text: this.value,
      x: this.node.position.x,
      y: this.node.position.y,
      fontSize: this.fontSize, // TODO scale text
      color: this.color,
      rect: this.node.rect,
      textAlign: this.textAlign,
      textBaseline: this.textBaseline,
    });
  }

  getProps(): TextProps {
    return {
      value: this.value,
      color: this.color,
      fontSize: this.fontSize,
      textAlign: this.textAlign,
      textBaseline: this.textBaseline,
    };
  }
}

export type TextProps = {
  value: string;
  color: string;
  fontSize: number;
  textAlign: `left` | `center` | `right`;
  textBaseline: `bottom` | `middle` | `top`;
};
