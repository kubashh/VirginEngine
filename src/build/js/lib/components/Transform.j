class Transform {
  positionX = 0
  positionY = 0
  rotationZ = 0
  scaleX = 1
  scaleY = 1

  constructor({ position, rotation, scale }) {
    this.positionX = position.x
    this.positionY = position.y
    this.rotationZ = rotation.z
    this.scaleX = scale.x
    this.scaleY = scale.y
  }

  get position() {
    return {
      x: this.positionX,
      y: this.positionY
    }
  }
  set position({ x, y }) {
    this.positionX = x
    this.positionY = y
  }

  get rotation() {
    return {
      z: this.rotationZ
    }
  }
  set rotation({ z }) {
    this.rotationZ = z
  }

  get scale() {
    return {
      x: this.scaleX,
      y: this.scaleY
    }
  }
  set scale({ x, y }) {
    this.scaleX = x
    this.scaleY = y
  }
}