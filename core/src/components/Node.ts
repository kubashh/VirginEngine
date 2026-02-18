import Sprite from "./Sprite"
import Text from "./Text"
import Collider from "./Collider"
import Physics from "./Physics"
import Animation from "./Animation"
import AudioElement from "./AudioElement"
import { nodes } from "../values/consts"
import { deepCopy, isChildKey, randStr } from "../util/basicFunctions"

const keywords = [`parent`, `position`, `rotation`, `scale`]

export default class Node implements TNode {
  name
  parent

  private transform = {
    p: {} as XY,
    rz: 0,
    s: {} as XY,
  }

  rect

  text?: TText
  sprite?: TSprite
  physics?: TPhysics

  collider
  animation?: TAnimation
  audio

  start
  update
  render

  constructor(
    {
      parent,
      transform,
      rect,
      text,
      sprite,
      collider,
      physics,
      animation,
      audio,
      start,
      update,
      render,
      ...rest
    }: NodeProps,
    name: string,
  ) {
    nodes.push(this)

    this.name = name
    this.parent = parent || ({} as TNode)
    if (parent) this.parent[this.name] = this

    this.transform.p = new GSXY(transform?.position)
    if (transform?.rotation) this.rotation = transform.rotation
    this.transform.s = new GSXY(transform?.scale || { x: 1, y: 1 })

    if (rect) this.rect = rect
    if (text) this.text = new Text(text, this)
    if (sprite) this.sprite = new Sprite(sprite, this)
    if (physics) this.physics = new Physics(physics, this)

    if (collider) this.collider = new Collider(collider, this)
    if (animation) this.animation = new Animation(animation, this)
    if (audio) this.audio = new AudioElement(audio)

    for (const key in rest) {
      ;(this as TNode)[key] = isChildKey(key)
        ? new Node({ ...rest[key], parent: this }, key)
        : typeof rest[key] === `function`
          ? rest[key].bind(this)
          : rest[key]
    }

    if (start) this.start = start
    if (update) this.update = update
    if (render) this.render = render
  }

  get childs(): TNode[] {
    return Object.keys(this).reduce(
      (prev, key) => (isChildKey(key) ? [...prev, (this as TNode)[key]] : prev),
      [] as TNode[],
    )
  }

  get props() {
    const newObj: Any = {
      start: this?.start,
      update: this?.update,
      transform: {
        position: {
          x: this.position.x,
          y: this.position.y,
        },
        rotation: this.rotation,
        scale: {
          x: this.scale.x,
          y: this.scale.y,
        },
      },
      rect: this.rect,
      sprite: this.sprite?.props,
      text: this.text?.props,
    }

    for (const key in this) {
      if (!(key in newObj) && !keywords.includes(key)) newObj[key] = this[key]
    }

    return deepCopy(newObj) as NodeProps
  }

  // Position
  get position(): XY {
    return this.transform.p
  }
  set position({ x, y }) {
    for (const child of this.childs) {
      child.position.x += -this.position.x + x
      child.position.y += -this.position.y + y
    }

    this.transform.p.x = x
    this.transform.p.y = y
  }

  // Rotation
  get rotation() {
    return this.transform.rz
  }
  set rotation(z: number) {
    z %= 360
    if (z < 0) z += 360

    for (const child of this.childs) {
      child.rotation = child.rotation - this.rotation + z
    }

    this.transform.rz = z
  }

  // Scale
  get scale(): XY {
    return this.transform.s
  }
  set scale({ x, y }) {
    for (const child of this.childs) {
      child.scale.x = (child.scale.x / this.scale.x) * x
      child.scale.y = (child.scale.y / this.scale.y) * y
    }

    this.transform.s.x = x
    this.transform.s.y = y

    this.sprite?.reload()
  }

  clone(parent = this.parent): TNode {
    let name = this.name
    while (parent[name]) {
      name = `${name.slice(0, -5)}${randStr(5)}`
    }

    const newNode = new Node({ ...this.props, parent }, name)
    newNode.start?.bind(newNode)()

    return newNode
  }

  destroy() {
    for (const child of this.childs) child.destroy()

    const { parent, name } = this

    for (const key in this) delete this[key]
    nodes.splice(nodes.indexOf(this), 1)
    delete parent[name]
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
