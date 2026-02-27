export default class Collider implements TCollider {
  private node;

  constructor(props: ColliderProps, node: TNode) {
    this.node = node;
  }
}
