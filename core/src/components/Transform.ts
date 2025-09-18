export default class Transform implements TTransform {
  private node

  private p
  private rz = 0
  private s

  constructor(props: TransformProps, node: TNode) {
    this.node = node

    this.p = new GSXY(props?.position)
    if (props?.rotation) this.rotation = props?.rotation
    this.s = new GSXY(props?.scale || { x: 1, y: 1 })

    node.position = this.position
    node.rotation = this.rotation
    node.scale = this.scale
  }

  // Position
  get position(): XY {
    return this.p
  }
  set position({ x, y }) {
    for (const child of this.node.childs) {
      child.position.x += -this.position.x + x
      child.position.y += -this.position.y + y
    }

    this.p.x = x
    this.p.y = y
  }

  // Rotation
  get rotation() {
    return this.rz
  }
  set rotation(z: number) {
    z %= 360
    if (z < 0) z += 360

    for (const child of this.node.childs) {
      child.rotation = child.rotation - this.rotation + z
    }

    this.rz = z
  }

  // Scale
  get scale(): XY {
    return this.s
  }
  set scale({ x, y }) {
    for (const child of this.node.childs) {
      child.scale.x = (child.scale.x / this.scale.x) * x
      child.scale.y = (child.scale.y / this.scale.y) * y
    }

    this.s.x = x
    this.s.y = y

    this.node.sprite?.reload()
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

class GSXY implements XY {
  private vx
  private vy

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
