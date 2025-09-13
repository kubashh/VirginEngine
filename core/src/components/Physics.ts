export class Physics implements TPhysics {
  velocity

  constructor({ velocity }: PhysicsProps) {
    this.velocity = velocity || 0
  }

  update() {
    console.count(`update`)
  }
}
