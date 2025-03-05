class GameObject {
  constructor({ parent, transform, sprite, ...rest }) {
    if (parent) {
      this.parent = parent
    }

    this.transform = new Transform(transform)
    if (sprite) this.sprite = new Sprite(sprite)

    for (const key in rest) {
      if (isFirstUpperCase(key)) {
        this[key] = new GameObject({ ...rest[key], parent: this })
      } else {
        this[key] = rest[key]
      }
    }
  }
}
