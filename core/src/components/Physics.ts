export default class Physics implements TPhysics {
  private gameObject
  velocity

  constructor({ velocity }: PhysicsProps, gameObject: TGameObject) {
    this.velocity = velocity || 0
    this.gameObject = gameObject
  }

  update() {}
}
