type XY = {
  x: number
  y: number
}

type Z = {
  z: number
}

type Void = () => void
type F<T> = () => T

type Obj<T> = Record<string, T>
type Any = Obj<any>

type GameObjectProps = {
  rect: XY
  parent: any
  transform: { position?: XY; rotation: { z: number }; scale: XY }
  text: { value: string }
  sprite: { color: string } | { imagePath: string }
  start?: Void
  update?: Void
  render?: Void

  [key: string]: any
}
