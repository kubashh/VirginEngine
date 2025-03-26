import { useEffect, useRef, useState } from "react"
import { editor } from "../../lib/consts"

export const ContextMenu = () => {
  const [[x, y, ...arr], setContextMenu] = useState([])
  const ref = useRef()

  useEffect(() => {
    editor.setContextMenu = setContextMenu

    const handler = ({ target }) =>
      ref.current && !ref.current.contains(target) && setContextMenu([])

    document.addEventListener(`mousedown`, handler)

    return () => document.removeEventListener(`mousedown`, handler)
  }, [])

  return arr?.length ? (
    <div
      ref={ref}
      className="ContextMenu"
      style={{ inset: `${y}px auto auto ${x}px` }}
    >
      {arr.map(([fn, text, show = true]) =>
        show ? (
          <div
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
