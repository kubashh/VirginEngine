import Transform from "./Transform"
import Sprite from "./Sprite"
import Text from "./Text"
import Collider from "./Collider"
import { gameObjects } from "../values/values"
import { deepCopy, isChildKey, randStr } from "../util/basicFunctions"

const keywords = [`toUpdate`, `toRender`, `parent`, `position`, `rotation`, `scale`]

export default class GameObject implements TGameObject {
  toUpdate: Void[] = []
  toRender: Void[] = []

  name
  parent

  start
  update
  render

  transform
  position: any
  rotation: any
  scale: any
  rect

  text
  sprite
  collider

  constructor(
    { parent, transform, rect, text, sprite, collider, start, update, render, ...rest }: GameObjectProps,
    name: string
  ) {
    this.name = name
    this.parent = parent || ({} as TGameObject)
    if (parent) this.parent[this.name] = this
    this.transform = new Transform(transform, this)

    if (rect) this.rect = rect
    if (text) this.text = new Text(text, this)
    if (sprite) this.sprite = Sprite(sprite, this)
    if (collider) this.collider = Collider

    for (const key in rest) {
      ;(this as TGameObject)[key] = isChildKey(key)
        ? new GameObject({ ...rest[key], parent: this }, key)
        : typeof rest[key] === `function`
        ? rest[key].bind(this)
        : rest[key]
    }

    if (start) this.start = start
    if (update) {
      this.update = update
      this.toUpdate.push(() => update.bind(this)())
    }
    if (render) {
      this.render = render
      this.toRender.push(() => render.bind(this)())
    }

    gameObjects.push(this)
  }

  get childs(): GameObject[] {
    return Object.keys(this).reduce(
      (prev, key) => (isChildKey(key) ? [...prev, (this as TGameObject)[key]] : prev),
      [] as GameObject[]
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
    // TO DO complite delete, do not delete objects and arrays, !!! DO NOT DELETE functions !!!
    for (const child of this.childs) child.destroy()

    const { parent, name } = this

    for (const key in this) delete this[key]
    gameObjects.splice(gameObjects.indexOf(this))
    delete parent[name]
  }
}
