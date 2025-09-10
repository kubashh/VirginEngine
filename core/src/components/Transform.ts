export default class Transform implements TTransform {
  gameObject

  p
  rz = 0
  s

  readonly

  constructor(props: { position?: XY; rotation?: number; scale?: XY }, gameObject: TGameObject) {
    this.gameObject = gameObject

    this.p = new GSXY(props?.position)
    if (props?.rotation) this.rotation = props?.rotation
    this.s = new GSXY(props?.scale || { x: 1, y: 1 })

    if (!gameObject) console.log(`kjjlhfdjfs`)

    gameObject.position = this.position
    gameObject.rotation = this.rotation
    gameObject.scale = this.scale

    if (props && gameObject) {
    } else {
      this.readonly = true
    }
  }

  // Position
  get position(): XY {
    return this.p
  }
  set position({ x, y }) {
    if (this.readonly) throw alert(`PROGRAMMER, you can't chage "readOnly" position`)

    for (const child of this.gameObject.childs) {
      child.transform.position = {
        x: child.transform.p.x - this.p.x + x,
        y: child.transform.p.y - this.p.y + y,
      }
    }

    this.p.x = x
    this.p.y = y
  }

  // Rotation
  get rotation() {
    return this.rz
  }
  set rotation(z: number) {
    if (this.readonly) throw alert(`PROGRAMMER, you can't chage "readOnly" rotation`)

    z %= 360
    if (z < 0) z += 360

    for (const child of this.gameObject.childs) {
      child.transform.rotation.z = child.rotation.z - this.rz + z
    }

    this.rz = z
  }

  // Scale
  get scale(): XY {
    return this.s
  }
  set scale({ x, y }) {
    if (this.readonly) throw alert(`PROGRAMMER, you can't chage "readOnly" scale`)

    for (const child of this.gameObject.childs) {
      child.transform.scale = {
        x: (child.transform.s.x / this.s.x) * x,
        y: (child.transform.s.y / this.s.y) * y,
      }
    }

    this.s.x = x
    this.s.y = y
  }

  get props() {
    return {
      position: {
        x: this.position.x,
        y: this.position.y,
      },
      rotation: this.rotation,
      scale: {
        x: this.scale.x,
        y: this.scale.y,
      },
    }
  }
}

class GSXY implements TGSXY {
  vx
  vy

  constructor(props?: XY) {
    this.vx = props?.x || 0
    this.vy = props?.y || 0
  }

  get x() {
    return this.vx
  }
  set x(v: number) {
    this.vx = v
  }

  get y() {
    return this.vy
  }
  set y(v: number) {
    this.vy = v
  }
}
