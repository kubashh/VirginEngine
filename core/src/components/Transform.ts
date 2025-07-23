import type { GameObject } from "./GameObject"

export class Transform {
  gameObject?: GameObject

  positionX = 0
  positionY = 0
  rotationZ = 0
  scaleX = 1
  scaleY = 1

  rect
  readonly

  constructor(props: { position: XY; rotation: Z; scale: XY; rect: XY }, gameObject: GameObject) {
    if (props && gameObject) {
      this.gameObject = gameObject

      const { position, rotation, scale, rect } = props
      this.position = position
      this.rotation = rotation
      this.scale = scale
      this.rect = rect

      gameObject.position = position
      gameObject.rotation = rotation
      gameObject.scale = scale
    } else {
      this.readonly = true
    }
  }

  // Position
  get position() {
    return { x: this.positionX, y: this.positionY }
  }
  set position({ x, y }) {
    if (this.readonly) throw alert(`PROGRAMMER, you can't chage "readOnly" position`)

    for (const child of this.gameObject!.childs) {
      child.transform.position = {
        x: child.transform.positionX - this.positionX + x,
        y: child.transform.positionY - this.positionY + y,
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
    if (this.readonly) throw alert(`PROGRAMMER, you can't chage "readOnly" rotation`)

    while (z < 0) {
      z += 360
    }
    while (z >= 360) {
      z -= 360
    }

    for (const child of this.gameObject!.childs) {
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
    if (this.readonly) throw alert(`PROGRAMMER, you can't chage "readOnly" scale`)

    for (const child of this.gameObject!.childs) {
      child.transform.scale = {
        x: (child.transform.scaleX / this.scaleX) * x,
        y: (child.transform.scaleY / this.scaleY) * y,
      }
    }

    this.scaleX = x
    this.scaleY = y
  }
}
