import { useState } from "react"

export const useHover = (defaultStyle, styleOnHover) => {
  const [style, setStyle] = useState(defaultStyle)

  const onMouseEnter = () => setStyle({ ...defaultStyle, ...styleOnHover })
  const onMouseLeave = () => setStyle({ ...defaultStyle })

  return { style, onMouseEnter, onMouseLeave }
}
