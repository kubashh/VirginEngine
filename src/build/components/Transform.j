class Transform {
  gameObject = null

  positionX = 0
  positionY = 0
  rotationZ = 0
  scaleX = 1
  scaleY = 1

  constructor(props, gameObject) {
    if (props) {
      this.gameObject = gameObject

      const { position, rotation, scale, rect } = props
      if (rect) this.rect = rect
      this.positionX = position.x
      this.positionY = position.y
      this.rotationZ = rotation.z
      this.scaleX = scale.x
      this.scaleY = scale.y
    } else {
      this.readOnly = true
    }
  }

  // Position
  get position() {
    return { x: this.positionX, y: this.positionY }
  }
  set position({ x, y }) {
    if (this.readOnly) {
      alert(`PROGRAMMER, you can't chage "readOnly" position`)
      return
    }

    for (const child of this.gameObject.childs) {
      child.transform.position = {
        x: child.transform.positionX - this.positionX + x,
        y: child.transform.positionY - this.positionY + y
      }
    }

    this.positionX = x
    this.positionY = y
  }

  // Rotation
  get rotation() {
    return { z: this.rotationZ }
  }
  set rotation({ z }) {
    if (this.readOnly) {
      alert(`PROGRAMMER, you can't chage "readOnly" rotation`)
      return
    }

    while (z < 0) {
      z += 360
    }
    while (z > 360) {
      z -= 360
    }

    for (const child of this.gameObject.childs) {
      let newRot = child.transform.rotationZ - this.rotationZ + z
      if (newRot < 0) {
        newRot += 360
      } else if (newRot > 360) {
        newRot -= 360
      }
      child.transform.rotation = { z: newRot }
    }

    this.rotationZ = z
  }

  // Scale
  get scale() {
    return { x: this.scaleX, y: this.scaleY }
  }
  set scale({ x, y }) {
    if (this.readOnly) {
      alert(`PROGRAMMER, you can't chage "readOnly" scale`)
      return
    }

    for (const child of this.gameObject.childs) {
      child.transform.scale = {
        x: (child.transform.scaleX / this.scaleX) * x,
        y: (child.transform.scaleY / this.scaleY) * y
      }
    }

    this.scaleX = x
    this.scaleY = y
  }
}
