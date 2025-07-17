type XY = {
  x: number
  y: number
}

type Z = {
  z: number
}

type Void = () => void

type Obj<T> = Record<string, T>
