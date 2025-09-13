import { drawImage, file } from "../util/basicFunctions"

export default class Sprite extends Image implements TSprite {
  gameObject
  path

  constructor({ path }: SpriteProps, gameObject: TGameObject) {
    super()

    this.src = file(path)
    this.path = path
    this.gameObject = gameObject
  }

  render() {
    drawImage(this, this.gameObject.position, this.gameObject.rotation, this.gameObject.scale)
  }

  get props() {
    return {
      path: this.path,
    }
  }
}
