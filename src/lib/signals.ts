import { useState } from "react"

type Void = () => void

function useConst<T>(v: T) {
  return useState<T>(v)[0]
}

function useRefresh() {
  const f = useState(false)[1]
  return () => f((prev) => !prev)
}

class Sig<T> {
  private v: T
  refresh: Void = () => {
    throw Error(`Refresh not bind!`)
  }

  constructor(v: T) {
    this.v = v
  }

  bind(fn?: Void) {
    if (fn) {
      const refresh = useRefresh()
      this.refresh = () => {
        fn()
        refresh()
      }
    } else this.refresh = useRefresh()
  }

  get value() {
    return this.v
  }
  set value(v: T) {
    this.v = v
    this.refresh?.()
  }
}

export type Signal<T> = Sig<T>

export function signal<T>(v: T) {
  return new Sig(v)
}

export function useSignal<T>(v: T, f?: Void) {
  const sig = useConst(new Sig(v))
  sig.bind(f)
  return sig
}
