import Transform from "./Transform"
import Sprite from "./Sprite"
import Text from "./Text"
import { gameObjects } from "../values/values"
import { deepCopy, isChildKey } from "../util/basicFunctions"

const keywords = [`toUpdate`, `toRender`, `parent`, `position`, `rotation`, `scale`]

export default class GameObject {
  toUpdate: Void[] = []
  toRender: Void[] = []

  parent: GameObject
  name: string
  start?: Void
  update?: Void
  transform
  position: any
  rotation: any
  scale: any
  rect?: XY

  text
  sprite

  constructor(
    { parent, transform, rect, text, sprite, start, update, render, ...rest }: GameObjectProps,
    name: string
  ) {
    this.name = name
    this.parent = parent || {}
    if (parent) (this.parent as any)[this.name] = this
    this.transform = new Transform(transform, this)

    if (rect) this.rect = rect
    if (text) this.text = new Text(text, this)
    if (sprite) this.sprite = Sprite(sprite, this)

    for (const key in rest) {
      ;(this as Any)[key] = isChildKey(key)
        ? new GameObject({ ...rest[key], parent: this }, key)
        : typeof rest[key] === `function`
        ? rest[key].bind(this)
        : rest[key]
    }

    if (update) {
      this.update = update
      this.toUpdate.push(() => this.update!.bind(this)())
    }
    if (render) this.toRender.push(() => render.bind(this)())

    if (start) {
      this.start = start
      this.start!.bind(this)()
    }

    gameObjects.push(this)
  }

  get childs(): GameObject[] {
    return Object.keys(this).reduce(
      (prev, key) => (isChildKey(key) ? [...prev, (this as Any)[key]] : prev),
      [] as GameObject[]
    )
  }

  get props() {
    const newObj: Any = {
      start: this?.start,
      update: this?.update,
      transform: this.transform.props,
      rect: deepCopy(this.rect),
      sprite: this.sprite?.props,
      text: this.text?.props,
    }

    for (const key in this) {
      if (!(key in newObj) && !keywords.includes(key)) newObj[key] = this[key]
    }

    return deepCopy(newObj)
  }

  // Clone
  clone(parent: Any = this.parent) {
    const name = this.name

    let newName = name
    let i = 0
    while (parent[newName]) {
      newName = `${name}${i}`
      i++
    }

    new GameObject({ ...this.props, parent }, newName)
  }

  destroy() {
    // TO DO complite delete, do not delete objects and arrays, !!! DO NOT DELETE functions !!!
    for (const child of this.childs) child.destroy()

    const { parent } = this
    const parentKey = this.name

    for (const key in this) delete (this as Any)[key]
    gameObjects.splice(gameObjects.indexOf(this))
    delete (parent as Any)[parentKey]
  }
}
