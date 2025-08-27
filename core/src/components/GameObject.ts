import Transform from "./Transform"
import Sprite from "./Sprite"
import Text from "./Text"
import Rect from "./Rect"
import { gameObjects } from "../values/values"
import { deepCopy, isChildKey } from "../util/basicFunctions"

const keywords = [`toUpdate`, `toRender`, `parent`, `position`, `rotation`, `scale`]

export default class GameObject {
  toUpdate: Void[] = []
  toRender: Void[] = []

  parent: GameObject
  start?: Void
  update?: Void
  transform
  position: any
  rotation: any
  scale: any
  rect: any

  text
  sprite

  constructor({ parent, transform, rect, text, sprite, start, update, render, ...rest }: Any) {
    this.parent = parent || new GameObject({ parent: {} })
    this.transform = new Transform(transform, this)

    if (rect) this.rect = new Rect(rect)
    if (text) this.text = new Text(text.value, this, rect)
    if (sprite) this.sprite = Sprite(sprite, this)

    for (const key in rest) {
      ;(this as Any)[key] = isChildKey(key)
        ? new GameObject({ ...rest[key], parent: this })
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

  get name() {
    for (const key in this.parent) {
      if (this === (this.parent as Any)[key]) return key
    }

    throw Error(`No name in Obj!`)
  }

  get props() {
    const newObj: Any = {
      start: this?.start,
      update: this?.update,
      transform: this.transform.props,
      rect: this.rect?.props,
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

    parent[newName] = new GameObject({ ...this.props, parent })
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
