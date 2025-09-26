export default class Animation implements TAnimation {
  private node

  constructor(props: AnimationProps, node: TNode) {
    this.node = node
  }
}
