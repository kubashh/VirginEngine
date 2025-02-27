import { useEffect, useRef, useState } from "react"

export const ContextMenu = () => {
  const [{ x, y, arr }, setContextMenu] = useState({})
  const ref = useRef()

  useEffect(() => {
    window.editor.setContextMenu = setContextMenu

    const handler = ({ target }) => {
      if (ref.current) {
        if (!ref.current.contains(target)) {
          setContextMenu({})
        }
      }
    }

    document.addEventListener(`mousedown`, handler)

    return () => {
      document.removeEventListener(`mousedown`, handler)
    }
  }, [])

  return arr?.length ? (
    <div
      ref={ref}
      style={{
        position: `absolute`,
        zIndex: 1,
        left: x,
        top: y,
        width: 200,
        backgroundColor: `#333`,
        border: `3px solid #333`
      }}
    >
      {arr
        .filter(([, , show = true]) => show)
        .map(([text, fn, show = true]) => (
          <div
            key={text}
            onClick={() => {
              fn()
              setContextMenu({})
            }}
            style={{
              cursor: `pointer`,
              color: !show && `gray`,
              "&:hover": {
                backgroundColor: `#333`
              }
            }}
          >
            {text}
          </div>
        ))}
    </div>
  ) : (
    <div />
  )
}
