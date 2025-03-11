class GameObject {
  constructor({ parent, transform, sprite, ...rest }) {
    //const dc = (obj) => JSON.parse(JSON.stringify(obj))

    if (parent) {
      this.parent = parent
    }

    this.transform = new Transform(transform)
    //if (sprite) this.sprite = new Sprite(dc(sprite))

    for (const key in rest) {
      if (isFirstUpperCase(key)) {
        this[key] = new GameObject({ ...rest[key], parent: this })
      } else {
        this[key] =
          typeof rest[key] === `function` ? rest[key].bind(this) : rest[key]
      }
    }
  }

  getChilds() {
    const childs = []
    for (const key in this) {
      if (isFirstUpperCase(key)) {
        childs.push(this[key])
      }
    }
    return childs
  }

  delete() {
    for (const child of this.getChilds()) {
      child.delete()
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
