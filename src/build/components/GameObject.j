class GameObject {
  constructor({ parent, transform, sprite, ...rest }) {
    if (parent) {
      this.parent = parent
    }

    this.transform = new Transform(transform, this)
    //if (sprite) this.sprite = new Sprite(sprite)

    for (const key in rest) {
      if (isFirstUpperCase(key)) {
        this[key] = new GameObject({ ...rest[key], parent: this })
      } else {
        this[key] =
          typeof rest[key] === `function` ? rest[key].bind(this) : rest[key]
      }
    }
  }

  get childs() {
    const childs = []
    for (const key in this) {
      if (isFirstUpperCase(key)) {
        childs.push(this[key])
      }
    }
    return childs
  }

  destroy() {
    for (const child of this.childs) {
      child.destroy()
    }

    for (const key in this.parent) {
      if (this.parent[key] === this) {
        delete this.parent[key]
      }
    }

    for (const key in this) {
      delete this[key]
    }
  }
}
