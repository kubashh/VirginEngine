import type { Sprite } from "./Sprite";

export class Animation {
  currentFrame: number = 0;
  frames: Sprite[];

  constructor(props: AnimationProps) {
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
