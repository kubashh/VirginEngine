import type { Node } from "./Node";
import type { Sprite } from "./Sprite";

export class Animation {
  private node: Node;

  currentFrame: number = 0;
  frames: Sprite[];

  constructor(props: AnimationProps, node: Node) {
    this.node = node;

    this.frames = props.frames;
  }

  render() {
    this.frames[this.currentFrame].render();

    this.currentFrame++;
    if (this.currentFrame >= this.frames.length) this.currentFrame = 0;
  }

  start() {
    this.currentFrame = 0;
  }

  stop() {}
}
