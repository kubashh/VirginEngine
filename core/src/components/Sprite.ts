import { drawImage, file } from "../util/basicFunctions"

export default class Sprite extends Image implements TSprite {
  gameObject
  path

  constructor(props: { path: string }, gameObject: TGameObject) {
    super()

    this.src = file(props.path).src
    this.path = props.path
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
