import { Camera, ctx } from "@/values/values"
import { file } from "../util/basicFunctions"

export default class Sprite extends Image implements TSprite {
  gameObject
  path

  private staticDrawProps = { x: 0, y: 0 }

  constructor({ path }: SpriteProps, gameObject: TGameObject) {
    super()

    this.gameObject = gameObject
    this.src = file(path)
    this.path = path
    this.onload = this.bind
  }

  bind() {
    resizeImage(this, this.gameObject.scale)
    this.onload = () => {}
    this.staticDrawProps = {
      x: Camera.xOffset - this.width * 0.5,
      y: Camera.yOffset - this.height * 0.5,
    }
  }

  render() {
    ctx.drawImage(
      this,
      this.gameObject.position.x + this.staticDrawProps.x,
      this.gameObject.position.y + this.staticDrawProps.y
    )
  }

  get props() {
    return {
      path: this.path,
    }
  }
}

function resizeImage(image: HTMLImageElement, { x, y }: XY) {
  if (x === 1 && y === 1) return

  const ctx = document.createElement(`canvas`).getContext(`2d`)!
  const newWidth = image.width * x
  const newHeight = image.height * y

  ctx.canvas.width = newWidth
  ctx.canvas.height = newHeight

  ctx.drawImage(image, 0, 0, newWidth, newHeight)
  image.src = ctx.canvas.toDataURL()
}
