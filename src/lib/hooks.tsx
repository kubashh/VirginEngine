import { useState } from "react"
import { useSignal } from "./Signal"
import type { Signal } from "./Signal"

export function useArrow(main = false, haveChilds = true): [React.ReactNode, Signal<boolean>] {
  const open = useSignal(main)

  return [
    haveChilds ? (
      <div
        className="text-center justify-self-center w-6 h-6 rounded-full hover cursor-pointer"
        style={{ transform: `rotate(${open.value ? 90 : 0}deg)` }}
        onClick={() => (open.value = !open.value)}
        children=">"
      />
    ) : (
      <div className="w-6 h-6" />
    ),
    open,
  ]
}

export function useRefresh() {
  const f = useState(false)[1]
  return () => f((prev) => !prev)
}

export function useConst(value: any) {
  return useState(value)[0]
}
