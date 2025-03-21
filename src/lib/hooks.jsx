import { useState } from "react"

export const useHover = () => {
  const [isHover, setIsHover] = useState(false)
  return [
    isHover,
    {
      onMouseEnter: () => setIsHover(true),
      onMouseLeave: () => setIsHover(false)
    }
  ]
}

export const useArrow = (main, haveChilds = true) => {
  const [open, setOpen] = useState(main)

  return [
    haveChilds ? (
      <div
        className="pointer transition textAlign justifySelf"
        style={{
          width: 24,
          height: 24,
          borderRadius: 12,
          transform: `rotate(${open ? 90 : 0}deg)`
        }}
        onClick={() => setOpen((prev) => !prev)}
        children={`>`}
      />
    ) : (
      <div style={{ marginLeft: 24 }} />
    ),
    open,
    setOpen
  ]
}

export const useRefresh = () => {
  const [, setState] = useState(false)
  return () => setState((prev) => !prev)
}

export const useConst = (value) => {
  return useState(value)[0]
}
