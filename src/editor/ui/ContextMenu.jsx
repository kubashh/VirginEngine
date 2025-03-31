import { useEffect, useRef, useState } from "react"
import { editor } from "../../lib/consts"

const useContextMenu = (ref) => {
  const [[x, y, ...arr], setContextMenu] = useState([])

  useEffect(() => {
    editor.setContextMenu = setContextMenu

    const handler = ({ target }) =>
      ref.current && !ref.current.contains(target) && setContextMenu([])

    document.addEventListener(`mousedown`, handler)

    return () => document.removeEventListener(`mousedown`, handler)
  }, [ref])

  return [arr, { inset: `${y}px auto auto ${x}px` }, setContextMenu]
}

export const ContextMenu = () => {
  const ref = useRef()
  const [arr, style, setContextMenu] = useContextMenu(ref)

  return arr?.length ? (
    <div ref={ref} className="zAbsolute w200 bgc333 p3" style={style}>
      {arr.map(([fn, text, show = true]) =>
        show ? (
          <div
            className="hover"
            key={text}
            onClick={() => {
              fn()
              setContextMenu([])
            }}
            children={text}
          />
        ) : null
      )}
    </div>
  ) : null
}
