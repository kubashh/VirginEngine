import { lerp } from "../util/basicFunctions";

export default class Physics implements TPhysics {
  static gravitySpeed = 0.6;

  private node;

  velocity = 0;
  target = {} as XY;
  gravity;

  constructor({ gravity }: PhysicsProps, node: TNode) {
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

  addForce({ x, y }: XY) {
    this.target.x += x;
    this.target.y += y;
  }
}
