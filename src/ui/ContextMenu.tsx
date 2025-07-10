import { useEffect, useRef } from "react"
import { contextMenu } from "../lib/consts"

export default function ContextMenu() {
  const ref = useRef<HTMLDivElement>(null)
  contextMenu.bind()

  useEffect(() => {
    function handler({ target }: { target: any }) {
      if (ref.current && !ref.current.contains(target)) contextMenu.value = []
    }

    document.addEventListener(`mousedown`, handler)

    return () => document.removeEventListener(`mousedown`, handler)
  }, [ref])

  return contextMenu.value.length > 2 ? (
    <div
      ref={ref}
      className="absolute z-1 w200 bgc333 p3"
      style={{ inset: `${contextMenu.value[1]}px auto auto ${contextMenu.value[0]}px` }}
    >
      {contextMenu.value.slice(2).map(([fn, text, show = true]: any) =>
        show ? (
          <div
            className="hover"
            key={text}
            onClick={() => {
              fn()
              contextMenu.value = []
            }}
            children={text}
          />
        ) : null
      )}
    </div>
  ) : null
}
