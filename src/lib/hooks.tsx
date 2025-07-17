"use client"

import { useState, useEffect } from "react"
import { useSignal, type Signal } from "./signals"

export function useArrow(main = false, haveChilds = true): [React.ReactNode, Signal<boolean>] {
  const open = useSignal(main)

  return [
    haveChilds ? (
      <div
        className="w-6 h-6 text-center justify-self-center rounded-full cursor-pointer hover"
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

export function useClient() {
  const [isClient, setIsClient] = useState(false)
  useEffect(() => setIsClient(true), [isClient])

  return isClient
}
