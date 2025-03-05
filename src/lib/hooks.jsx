import { useState } from "react"

export const useHover = (styleOnHover, defaultStyle) => {
  const [style, setStyle] = useState(defaultStyle)

  const onMouseEnter = () =>
    setStyle({
      cursor: `pointer`,
      ...defaultStyle,
      ...styleOnHover
    })
  const onMouseLeave = () => setStyle({ ...defaultStyle })

  return { style, onMouseEnter, onMouseLeave }
}

export const useArrow = (main, haveChilds = true) => {
  const [open, setOpen] = useState(main)

  return [
    haveChilds ? (
      <div
        style={{
          cursor: `pointer`,
          width: 24,
          height: 24,
          textAlign: `center`,
          justifySelf: `center`,
          borderRadius: 12,
          transform: `rotate(${open ? 90 : 0}deg)`,
          transition: `transform 150ms`
        }}
        onClick={() => setOpen((prev) => !prev)}
      >
        {`>`}
      </div>
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
