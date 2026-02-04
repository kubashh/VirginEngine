# VirginEngine Docs

## Engine

### Components

- `Node` (GameObject, 90% done)
- `Animation` (1% done)
- `AudioElement` (Audio; 80% done)
- `Collider` (1% done)
- `Physics` (20% done)
- `Sprite` (70% done)
- `Text` (50% done)

```ts
type TNode = {
  parent: TNode
  name: string

  start?: Void
  update?: Void
  render?: Void

  position: XY
  rotation: number
  scale: XY
  rect?: XY

  text?: TText
  sprite?: TSprite
  physics?: TPhysics
  animation?: TAnimation
  audio?: TAudio

  childs: TNode[]
  props: any
  clone: Void
  destroy: Void

  [key: string]: any
}

type TText = {
  value: string
  color: string

  textBaseline?: string
  textAlign?: string

  render: Void

  props: {
    value: string
  }
}

type TSprite = {
  path: string

  reload: Void
  resize: Void
  render: Void
  props: {
    path: string
  }
}

type TPhysics = {
  velocity: XY
  gravity: boolean

  update: Void
  AddForce: (force: XY) => void
}

type TCollider = {}

type TAnimation = {}

type TAudio = {
  play: Void
  pause: Void
}

type TScene = {
  camera: XY

  load: (newScene: { name: string; [key: string]: any }) => void
  close: Void

  [key: string]: any
}
```

### Objects

```ts
type scene = {
  camera: XY

  load(newScene: SceneProps): void

  [key: string]: any
}
```

### Util

```ts
function wait(time?: number | undefined): Promise<void>
function deepCopy<T>(data: T): T
function file(path: string): any
function randInt(min: number, max?: number | undefined): number
function rand(min?: number, max?: number | undefined): number
function randStr(n?: number): string
function randColor(): string
```

## Editor

### Config

```ts
type config = {
  gameName: string
  version: string
  author: string
  description: string
  fullScreen: boolean
  pathToMainScene: string
  performanceInfo: TEnum
}
```
