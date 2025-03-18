class Text {
  value = ``

  constructor({ value }, gameObject) {
    gameObject.toRender.push(this.render.bind(this))
    this.transform = gameObject.transform
    this.value = value
  }

  set text(newText) {
    this.value = newText
  }

  render() {
    ctx.fillStyle = `white`
    ctx.font = `22px serif`
    ctx.textAlign = `left`
    ctx.textBaseline = `top`

    ctx.fillText(
      `Text yoooo`,
      this.transform.position.x,
      this.transform.position.y
    )
  }
}
