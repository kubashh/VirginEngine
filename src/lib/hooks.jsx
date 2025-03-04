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
