type XY = {
  x: number
  y: number
}

type WH = {
  w: number
  h: number
}

type F<T> = () => T
type Void = F<void>

type Obj<T> = Record<string, T>
type Any = Obj<any>

// Props

type GameObjectProps = {
  rect?: XY
  parent?: TGameObject
  transform: TransformProps

  text: TextProps
  sprite: SpriteProps
  physics: PhysicsProps

  start?: Void
  update?: Void
  render?: Void

  [key: string]: any
}

type TransformProps = { position?: XY; rotation?: number; scale?: XY } | undefined
type TextProps = { value: string; color: string }
type SpriteProps = { path: string }
type PhysicsProps = { velocity?: number }

type drawTextProps = {
  text: string
  color: string
  x: number
  y: number
  w?: number
  h: number
  font?: string
  rect?: XY
  align?: XY
  textAlign?: string
  textBaseline?: string
}

type drawProps = {
  text?: string
  color?: string
  x: number
  y: number
  w?: number
  h: number
  font?: string
} & Any

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
  physics?: TPhysics

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
  path: string

  constructor: any

  reload: Void
  resize: Void
  render: Void
  props: { path: string }
}

type TPhysics = {
  velocity: number

  constructor: any

  update: Void
}

type TCollider = {
  constructor: any
}

type TAnimation = {
  constructor: any
}

type TScene = {
  camera: XY

  constructor: any

  load: (newScene: Any, name: string) => void
  close: Void

  [key: string]: any
}
