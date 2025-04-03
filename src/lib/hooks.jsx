import { useState } from "react"

export const useArrow = (main = false, haveChilds = true) => {
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
    setOpen
  ]
}

export const useRefresh = () => {
  const setState = useState(false)[1]
  return () => setState((prev) => !prev)
}

export const useConst = (value) => useState(value)[0]
