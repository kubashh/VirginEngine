type XY = {
  x: number
  y: number
}

type Void = () => void
type F<T> = () => T

type Obj<T> = Record<string, T>
type Any = Obj<any>

type GameObjectProps = {
  rect: XY
  parent?: TGameObject
  transform: { position?: XY; rotation: number; scale: XY }
  text: { value: string }
  sprite: { color: string } | { imagePath: string }
  start?: Void
  update?: Void
  render?: Void

  [key: string]: any
}

// Compponents

type TGameObject = {
  toUpdate: Void[] = []
  toRender: Void[] = []

  parent: TGameObject
  name: string

  start?: Void
  update?: Void
  render?: Void

  transform: TTransform
  position: any
  rotation: any
  scale: any
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
  gameObject?: TGameObject

  p: TGSXY
  rz: number
  s: TGSXY

  readonly?: boolean

  constructor: any

  // Position
  position: XY

  rotation: number

  scale: XY

  props: {
    position: XY
    rotation: number
    scale: XY
  }
}

type TGSXY = {
  vx: number
  vy: number

  constructor: any

  x: number
  y: number
}

type TText = {
  value: string
  rect?: XY
  transform: TTransform

  textBaseline?: string
  textAlign?: string

  constructor: any

  render: Void

  props: {
    value: string
  }
}

type TSprite = {
  gameObject: TGameObject

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
