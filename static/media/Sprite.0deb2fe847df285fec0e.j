class Sprite {
  constructor({ color }, gameObject) {
    this.gameObject = gameObject
    this.color = color
    gameObject.toRender.push(this.render.bind(this))
  }

  render = () => {
    draw({
      x: this.gameObject.position.x,
      y: this.gameObject.position.y,
      w: this.gameObject.scale.x,
      h: this.gameObject.scale.y,
      color: this.color,
    })
  }
}
