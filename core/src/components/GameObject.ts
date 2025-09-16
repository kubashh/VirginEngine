import Transform from "./Transform"
import Sprite from "./Sprite"
import Text from "./Text"
import Collider from "./Collider"
import { gameObjects } from "../values/values"
import { deepCopy, isChildKey, randStr } from "../util/basicFunctions"
import Physics from "./Physics"

const keywords = [`toUpdate`, `toRender`, `parent`, `position`, `rotation`, `scale`]

export default class GameObject implements TGameObject {
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
      start,
      update,
      render,
      ...rest
    }: GameObjectProps,
    name: string
  ) {
    gameObjects.push(this)

    this.name = name
    this.parent = parent || ({} as TGameObject)
    if (parent) this.parent[this.name] = this
    this.transform = new Transform(transform, this)

    if (rect) this.rect = rect
    if (text) this.text = new Text(text, this)
    if (sprite) this.sprite = new Sprite(sprite, this)
    if (physics) this.physics = new Physics(physics, this)

    if (collider) this.collider = Collider()

    for (const key in rest) {
      ;(this as TGameObject)[key] = isChildKey(key)
        ? new GameObject({ ...rest[key], parent: this }, key)
        : typeof rest[key] === `function`
        ? rest[key].bind(this)
        : rest[key]
    }

    if (start) this.start = start
    if (update) this.update = update
    if (render) this.render = render
  }

  get childs(): TGameObject[] {
    return Object.keys(this).reduce(
      (prev, key) => (isChildKey(key) ? [...prev, (this as TGameObject)[key]] : prev),
      [] as TGameObject[]
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

    return deepCopy(newObj)
  }

  clone(parent = this.parent) {
    const name = this.name

    let newName = name
    while (parent[newName]) {
      newName = `${name}${randStr(5)}`
    }

    const newGameObject = new GameObject({ ...this.props, parent }, newName)
    newGameObject.start?.bind(newGameObject)()
  }

  destroy() {
    for (const child of this.childs) child.destroy()

    const { parent, name } = this

    for (const key in this) delete this[key]
    gameObjects.splice(gameObjects.indexOf(this))
    delete parent[name]
  }
}
