export default class Animation implements TAnimation {
  private node;

  currentFrame = 0;
  frames;

  constructor(props: AnimationProps, node: TNode) {
    this.node = node;

    this.frames = props.frames;
  }

  update() {
    // draw this.frames[this.currentFrame]
  }

  start() {
    this.currentFrame = 0;
  }

  stop() {}
}
