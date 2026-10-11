import type { Node } from "./Node";

export class Collider {
  private node: Node;

  constructor(props: ColliderProps, node: Node) {
    this.node = node;
  }
}
