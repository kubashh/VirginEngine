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
}
