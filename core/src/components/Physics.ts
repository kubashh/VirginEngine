import { lerp } from "../util/basicFunctions";
import type { Node } from "./Node";

export class Physics {
  static gravitySpeed: number = 0.6;

  private node: Node;

  velocity: number = 0;
  target = {} as { x: number; y: number };
  gravity: boolean;

  constructor({ gravity }: PhysicsProps, node: Node) {
    this.gravity = gravity;
    this.node = node;

    setTimeout(
      () =>
        (this.target = {
          x: node.position.x,
          y: node.position.y,
        }),
    );
  }

  update() {
    if (this.gravity) {
      this.velocity -= Physics.gravitySpeed;
      this.target.y += this.velocity;
    }

    this.node.position = lerp(this.node.position, this.target, 0.5);
  }

  addForce({ x, y }: { x: number; y: number }) {
    this.target.x += x;
    this.target.y += y;
  }
}
