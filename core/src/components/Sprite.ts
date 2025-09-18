import { Camera, ctx } from "@/values/consts"
import { file } from "../util/basicFunctions"

export default class Sprite extends Image implements TSprite {
  private node
  private staticDrawProps = {} as XY

  path

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
    this.onload = () => {}
  }

  resize() {
    this.staticDrawProps = {
      x: Camera.xOffset - this.width * 0.5,
      y: Camera.yOffset - this.height * 0.5,
    }
  }

  render() {
    ctx.drawImage(
      this,
      this.node.position.x + this.staticDrawProps.x,
      this.node.position.y + this.staticDrawProps.y
    )
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
