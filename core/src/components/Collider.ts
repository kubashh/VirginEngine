import type { Node } from "./Node";

export class Collider implements TCollider {
  private node;

  constructor(props: ColliderProps, node: Node) {
    this.node = node;
  }
}

type TCollider = {};
