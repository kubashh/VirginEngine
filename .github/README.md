# VirginEngine

Simple JS game engine for 2D web games

## Engine

### Components

- `Node` (GameObject, 90% done)
- `Animation` (1% done)
- `AudioElement` (Audio; 80% done)
- `Collider` (1% done)
- `Physics` (20% done)
- `Sprite` (70% done)
- `Text` (50% done)

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

### Config [Docs](https://github.com/VirginEngine/docs?tab=readme-ov-file#config)
