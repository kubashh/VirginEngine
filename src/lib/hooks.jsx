import { useState } from "react"

export const useArrow = (main = false, haveChilds = true) => {
  const [open, setOpen] = useState(main)

  return [
    haveChilds ? (
      <div
        className="hover"
        style={{ transform: `rotate(${open ? 90 : 0}deg)` }}
        onClick={() => setOpen((prev) => !prev)}
        children=">"
      />
    ) : (
      <div />
    ),
    open,
    setOpen
  ]
}

export const useRefresh = () => {
  const [, setState] = useState(false)
  return () => setState((prev) => !prev)
}
