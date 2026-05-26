export default class Animation implements TAnimation {
  private node;

  currentFrame = 0;
  frames;

  constructor(props: AnimationProps, node: TNode) {
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
