import type GameObject from "./GameObject"
import { drawBoxMiddle } from "../util/basicFunctions"

interface Spr {
  gameObject: GameObject
  render: Void
  props: { color: string } | { imagePath: string }
}

export default function Sprite(props: { color?: string; imagePath?: string }, gameObject: GameObject): Spr {
  if (props.imagePath) return new PathSprite(props as { imagePath: string }, gameObject)
  return new BoxSprite(props as { color: string }, gameObject)
}

class BoxSprite implements Spr {
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

  get props() {
    return {
      color: this.color,
    }
  }
}

class PathSprite implements Spr {
  gameObject: GameObject
  imagePath: string

  constructor({ imagePath }: { imagePath: string }, gameObject: GameObject) {
    this.gameObject = gameObject
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

  get props() {
    return {
      imagePath: this.imagePath,
    }
  }
}
