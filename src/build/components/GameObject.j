class GameObject {
  toUpdate = []
  toRender = []

  constructor({
    parent,
    transform,
    rect,
    sprite,
    text,
    start,
    update,
    render,
    ...rest
  }) {
    gameObjects.push(this)

    if (parent) this.parent = parent

    this.transform = new Transform(transform, this)
    if (text) this.text = new Text(text, this, rect)
    //if (sprite) this.sprite = new Sprite(sprite)

    for (const key in rest) {
      if (isChildKey(key)) {
        this[key] = new GameObject({ ...rest[key], parent: this })
      } else {
        this[key] =
          typeof rest[key] === `function` ? rest[key].bind(this) : rest[key]
      }
    }

    if (update) this.toUpdate.push(update.bind(this))
    if (render) this.toRender.push(render.bind(this))

    start?.bind(this)()
  }

  get childs() {
    const childs = []
    for (const key in this) {
      if (isChildKey(key)) childs.push(this[key])
    }
    return childs
  }

  destroy() {
    GameObject.destroy(this)
  }

  static destroy(obj) {
    // TO DO complite delete, do not delete objects and arrays, !!! DO NOT DELETE functions !!!
    for (const child of obj.childs) GameObject.destroy(child)

    const { parent } = obj
    let parentKey = ``
    for (const key in obj.parent) {
      if (obj.parent[key] === obj) {
        parentKey = key
        break
      }
    }

    for (const key in obj) delete obj[key]
    gameObjects.splice(gameObjects.indexOf(obj))
    delete parent[parentKey]
  }
}
