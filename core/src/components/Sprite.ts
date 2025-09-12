import type GameObject from "./GameObject"
import { drawImage, file } from "../util/basicFunctions"

export default class Sprite implements TSprite {
  private gameObject: GameObject

  src: string
  img

  constructor({ src }: { src: string }, gameObject: GameObject) {
    this.gameObject = gameObject
    this.src = src

    this.img = new Image()
    this.img.onload = () => {
      // const width = img.width
      // const height = img.height
    }

    this.img.src = file(src).src
  }

  render() {
    drawImage(this.img, this.gameObject.position, this.gameObject.rotation, this.gameObject.scale)
  }

  get props() {
    return {
      src: this.src,
    }
  }
}
