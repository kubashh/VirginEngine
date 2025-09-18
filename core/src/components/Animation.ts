export default function Animation(props: AnimationProps, node: TNode): TAnimation {
  return new Anim(props, node)
}

class Anim implements TAnimation {
  private node

  constructor(props: AnimationProps, node: TNode) {
    this.node = node
  }
}
