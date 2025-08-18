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
