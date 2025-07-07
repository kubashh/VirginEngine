import { useState } from "react"

function useRefresh() {
  const f = useState(false)[1]
  return () => f((prev) => !prev)
}

export class Signal<T> {
  v: T
  refresh: () => void = () => {
    throw Error(`Refresh not bind!`)
  }

  constructor(v: T) {
    this.v = v
  }

  bind(fn?: () => void) {
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
