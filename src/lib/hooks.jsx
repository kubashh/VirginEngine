import { useState } from "react"

export function useArrow(main = false, haveChilds = true) {
  const [open, setOpen] = useState(main)

  return [
    haveChilds ? (
      <div
        className="textAlign justifySelf w24 h24 borderRadius transition hover"
        style={{ transform: `rotate(${open ? 90 : 0}deg)` }}
        onClick={() => setOpen((prev) => !prev)}
        children=">"
      />
    ) : (
      <div className="w24 h24" />
    ),
    open,
    setOpen,
  ]
}

export function useRefresh() {
  const f = useState(false)[1]
  return () => f((prev) => !prev)
}

export function useConst(value) {
  return useState(value)[0]
}
