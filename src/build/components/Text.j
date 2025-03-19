class Text {
  value = ``
  rect = undefined
  transform = undefined

  constructor({ value }, gameObject, rect) {
    this.transform = gameObject.transform
    this.value = value
    this.rect = rect || { x: 0, y: 0 }
    gameObject.toRender.push(this.render.bind(this))
  }

  set text(newText) {
    this.value = newText
  }

  render() {
    draw({
      text: this.value,
      x: this.transform.position.x,
      y: this.transform.position.y,
      fillStyle: `white`,
      font: `${this.transform.scale.y}px serif`,
      textBaseline: Text.textBaseline[this.rect.x],
      textAlign: Text.textAlign[this.rect.y]
    })
  }

  static textBaseline = [`top`, `middle`, `bottom`]
  static textAlign = [`left`, `center`, `right`]
}
