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

      const { position, rotation, scale } = props
      this.positionX = position.x
      this.positionY = position.y
      this.rotationZ = rotation.z
      this.scaleX = scale.x
      this.scaleY = scale.y
    } else {
      this.readOnly = true
    }
  }

  get position() {
    return {
      x: this.positionX,
      y: this.positionY
    }
  }
  set position({ x, y }) {
    if (!this.readOnly) {
      this.positionX = x
      this.positionY = y

      // TODO !!!!!!!!!!!
      for (const child of this.gameObject.getChilds()) {
        //child.transform.set(local + this)
      }
    }
  }

  get rotation() {
    return {
      z: this.rotationZ
    }
  }
  set rotation({ z }) {
    if (!this.readOnly) {
      this.rotationZ = z
    }
  }

  get scale() {
    return {
      x: this.scaleX,
      y: this.scaleY
    }
  }
  set scale({ x, y }) {
    if (!this.readOnly) {
      this.scaleX = x
      this.scaleY = y
    }
  }
}
