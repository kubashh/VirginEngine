import type GameObject from "./GameObject"
import { drawBoxMiddle } from "../util/basicFunctions"

export default function Sprite(
  props: { color?: string; imagePath?: string },
  gameObject: GameObject
): TSprite {
  if (props.imagePath) return new PathSprite(props as { imagePath: string }, gameObject)
  return new BoxSprite(props as { color: string }, gameObject)
}

class BoxSprite implements TSprite {
  private gameObject: TGameObject

  color: string

  constructor({ color }: { color: string }, gameObject: GameObject) {
    this.gameObject = gameObject
    this.color = color
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

  get props() {
    return {
      color: this.color,
    }
  }
}

class PathSprite implements TSprite {
  private gameObject: GameObject

  imagePath: string

  constructor({ imagePath }: { imagePath: string }, gameObject: GameObject) {
    this.gameObject = gameObject
    this.imagePath = imagePath
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

  get props() {
    return {
      imagePath: this.imagePath,
    }
  }
}
