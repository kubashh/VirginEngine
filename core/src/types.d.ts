type XY = {
  x: number
  y: number
}

type F<T> = () => T
type Void = F<void>

type Obj<T> = Record<string, T>
type Any = Obj<any>

// Props

type GameObjectProps = {
  rect: XY
  parent?: TGameObject
  transform: TransformProps
  text: TextProps
  sprite: { color: string } | { imagePath: string }
  start?: Void
  update?: Void
  render?: Void

  [key: string]: any
}

type TransformProps = { position?: XY; rotation?: number; scale?: XY }
type TextProps = { value: string; color: string }

// Compponents

type TGameObject = {
  parent: TGameObject
  name: string

  start?: Void
  update?: Void
  render?: Void

  transform: TTransform
  position: XY
  rotation: number
  scale: XY
  rect?: XY

  text?: TText
  sprite?: TSprite

  constructor: any

  childs: GameObject[]
  props: any
  clone: Void
  destroy: Void

  [key: string]: any
}

type TTransform = {
  constructor: any

  position: XY
  rotation: number
  scale: XY

  props: {
    position: XY
    rotation: number
    scale: XY
  }
}

type TText = {
  value: string
  color: string

  textBaseline?: string
  textAlign?: string

  constructor: any

  render: Void

  props: {
    value: string
  }
}

type TSprite = {
  constructor: any

  render: Void
  props: { color: string } | { imagePath: string }
}

type TPhysics = {
  velocity: number

  constructor: any
}

type TCollider = {
  constructor: any
}

type TAnimation = {
  constructor: any
}
