export default class Physics implements TPhysics {
  static gravitySpeed = 10

  private gameObject
  velocity = { x: 0, y: 0 }
  gravity

  constructor({ gravity }: PhysicsProps, gameObject: TGameObject) {
    this.gravity = gravity
    this.gameObject = gameObject
  }

  update() {
    if (this.gravity) this.velocity.y -= Physics.gravitySpeed

    this.gameObject.position.x += this.velocity.x
    this.gameObject.position.y += this.velocity.y
  }

  AddForce({ x, y }: XY) {
    this.velocity.x += x
    this.velocity.y += y
  }
}
