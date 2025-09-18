export default class Physics implements TPhysics {
  static gravitySpeed = 10

  private node

  velocity = { x: 0, y: 0 }
  gravity

  constructor({ gravity }: PhysicsProps, node: TNode) {
    this.gravity = gravity
    this.node = node
  }

  update() {
    if (this.gravity) this.velocity.y -= Physics.gravitySpeed

    this.node.position.x += this.velocity.x
    this.node.position.y += this.velocity.y
  }

  AddForce({ x, y }: XY) {
    this.velocity.x += x
    this.velocity.y += y
  }
}
