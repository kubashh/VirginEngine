import Transform from "./Transform"
import Sprite from "./Sprite"
import Text from "./Text"
import Collider from "./Collider"
import Physics from "./Physics"
import Animation from "./Animation"
import AudioElement from "./AudioElement"
import { nodes } from "../values/consts"
import { deepCopy, isChildKey, randStr } from "../util/basicFunctions"

const keywords = [`toUpdate`, `toRender`, `parent`, `position`, `rotation`, `scale`]

export default class Node implements TNode {
  name
  parent

  transform: TTransform
  position = {} as XY
  rotation = 0
  scale = {} as XY
  rect

  text?: TText
  sprite?: TSprite
  physics?: TPhysics

  collider
  animation
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
    name: string
  ) {
    nodes.push(this)

    this.name = name
    this.parent = parent || ({} as TNode)
    if (parent) this.parent[this.name] = this
    this.transform = new Transform(transform, this)

    if (rect) this.rect = rect
    if (text) this.text = new Text(text, this)
    if (sprite) this.sprite = new Sprite(sprite, this)
    if (physics) this.physics = new Physics(physics, this)

    if (collider) this.collider = new Collider(collider, this)
    if (animation) this.animation = Animation(animation, this)
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
      [] as TNode[]
    )
  }

  get props() {
    const newObj: Any = {
      start: this?.start,
      update: this?.update,
      transform: this.transform.props,
      rect: this.rect,
      sprite: this.sprite?.props,
      text: this.text?.props,
    }

    for (const key in this) {
      if (!(key in newObj) && !keywords.includes(key)) newObj[key] = this[key]
    }

    return deepCopy(newObj) as NodeProps
  }

  clone(parent = this.parent) {
    let name = this.name
    while (parent[name]) {
      name = `${name.slice(0, -5)}${randStr(5)}`
    }

    const newNode = new Node({ ...this.props, parent }, name)
    newNode.start?.bind(newNode)()
  }

  destroy() {
    for (const child of this.childs) child.destroy()

    const { parent, name } = this

    for (const key in this) delete this[key]
    nodes.splice(nodes.indexOf(this), 1)
    delete parent[name]
  }
}
