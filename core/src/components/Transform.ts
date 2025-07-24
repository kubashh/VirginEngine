import type GameObject from "./GameObject"

export default class Transform {
  gameObject?: GameObject

  px = 0
  py = 0
  rz = 0
  sx = 1
  sy = 1

  rect = { x: 0, y: 0 }
  readonly

  constructor(props: { position?: XY; rotation?: Z; scale?: XY; rect: XY }, gameObject: GameObject) {
    if (props && gameObject) {
      this.gameObject = gameObject

      const { position, rotation, scale, rect } = props
      if (position) this.position = position
      if (rotation) this.rotation = rotation
      if (scale) this.scale = scale
      if (rect) this.rect = rect

      gameObject.position = this.position
      gameObject.rotation = this.rotation
      gameObject.scale = this.scale
    } else {
      this.readonly = true
    }
  }

  // Position
  get position() {
    return { x: this.px, y: this.py }
  }
  set position({ x, y }) {
    if (this.readonly) throw alert(`PROGRAMMER, you can't chage "readOnly" position`)

    for (const child of this.gameObject!.childs) {
      child.transform.position = {
        x: child.transform.px - this.px + x,
        y: child.transform.py - this.py + y,
      }
    }

    this.px = x
    this.py = y
  }

  // Rotation
  get rotation() {
    return { z: this.rz }
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
      let newRot = child.transform.rz - this.rz + z
      if (newRot < 0) {
        newRot += 360
      } else if (newRot > 360) {
        newRot -= 360
      }
      child.transform.rotation = { z: newRot }
    }

    this.rz = z
  }

  // Scale
  get scale() {
    return { x: this.sx, y: this.sy }
  }
  set scale({ x, y }) {
    if (this.readonly) throw alert(`PROGRAMMER, you can't chage "readOnly" scale`)

    for (const child of this.gameObject!.childs) {
      child.transform.scale = {
        x: (child.transform.sx / this.sx) * x,
        y: (child.transform.sy / this.sy) * y,
      }
    }

    this.sx = x
    this.sy = y
  }
}
