class Text {
  value = ``

  constructor({ value }, gameObject) {
    gameObject.toRender.push(this.render)
    this.gameObject = gameObject
    this.value = value
  }

  set text(newText) {
    this.value = newText
  }

  render() {
    console.log("this ", this)
    // Render
  }
}
