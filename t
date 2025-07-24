import { drawBoxMiddle } from "../util/basicFunctions"
import type { GameObject } from "./GameObject"

export class Sprite {
  constructor(props: { color: string; imagePath?: string }, gameObject: GameObject) {
    if (props.imagePath) new PathSprite(props as { color: string; imagePath: string }, gameObject)
    else new BoxSprite(props, gameObject)
  }
}

class BoxSprite {
  gameObject: GameObject
  color: string

  constructor({ color }: { color: string }, gameObject: GameObject) {
    this.gameObject = gameObject
    this.color = color
    gameObject.toRender.push(this.render.bind(this))
  }

  render() {
    drawBoxMiddle(
      this.gameObject.position.x,
      this.gameObject.position.y,
      this.gameObject.scale.x,
      this.gameObject.scale.y,
      this.color
    )
  }
}

class PathSprite {
  gameObject: GameObject
  color: string
  imagePath: string

  constructor({ color, imagePath }: { color: string; imagePath: string }, gameObject: GameObject) {
    this.gameObject = gameObject
    this.color = color
    this.imagePath = imagePath
    gameObject.toRender.push(this.render.bind(this))
    throw Error(`PathSprite, camming soon!`)
  }

  render() {
    // drawBoxMiddle(
    //   this.gameObject.position.x,
    //   this.gameObject.position.y,
    //   this.gameObject.scale.x,
    //   this.gameObject.scale.y,
    //   this.color
    // )
  }
}
