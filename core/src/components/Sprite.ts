import { Camera, ctx } from "../values/consts"
import { file } from "../util/basicFunctions"

export default class Sprite extends Image implements TSprite {
  private node
  private staticDrawProps = {} as XY

  path
  w = 0
  h = 0

  constructor({ path }: SpriteProps, node: TNode) {
    super()

    this.node = node
    this.src = file(path)
    this.path = path
    this.onload = this.reload
    this.resize()
  }

  reload() {
    resizeImage(this, this.node.scale)
    this.onload = this.resize
  }

  resize() {
    this.staticDrawProps = {
      x: Camera.xOffset - this.width * 0.5,
      y: Camera.yOffset - this.height * 0.5,
    }

    this.w = this.width * this.node.scale.x
    this.h = this.height * this.node.scale.x
  }

  render() {
    const x = this.staticDrawProps.x - this.node.position.x
    const y = this.staticDrawProps.y - this.node.position.y
    if (
      0 < x + this.w &&
      x - this.w < 2 * Camera.xOffset &&
      0 < y + this.h &&
      y - this.h < 2 * Camera.yOffset
    )
      ctx.drawImage(this, x, y)
  }

  get props() {
    return {
      path: this.path,
    }
  }
}

resizeImage.ctx = document.createElement(`canvas`).getContext(`2d`)!
resizeImage.ctx.canvas.style.display = `none`
function resizeImage(image: HTMLImageElement, { x, y }: XY) {
  if (x === 1 && y === 1) return

  const newWidth = image.width * x
  const newHeight = image.height * y

  resizeImage.ctx.canvas.width = newWidth
  resizeImage.ctx.canvas.height = newHeight

  resizeImage.ctx.drawImage(image, 0, 0, newWidth, newHeight)
  image.src = resizeImage.ctx.canvas.toDataURL()
}
