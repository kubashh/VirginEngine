import { useState } from "react"
import { type Signal, useSignal } from "@kubashh/signal"

export function useArrow(
  main = false,
  haveChilds = true,
  src?: string
): [React.ReactNode, Signal<boolean>] {
  const open = useSignal(main)

  if (src) return [<img className="w-6 max-h-6 p-0.5" src={src} />, open]

  if (!haveChilds) return [<div className="w-6 h-6" />, open]

  return [
    <div
      className="w-6 h-6 text-center justify-self-center rounded-full cursor-pointer hover:text-zinc-400"
      style={{ transform: `rotate(${open.value ? 90 : 0}deg)` }}
      onClick={() => (open.value = !open.value)}
      children=">"
    />,
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
