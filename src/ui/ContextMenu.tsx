import { useEffect, useRef, useState } from "react"
import { editor } from "../lib/consts"

export default function ContextMenu() {
  const ref = useRef<HTMLDivElement>(null)

  const [arr, setContextMenu] = useState<number[]>([])

  useEffect(() => {
    editor.setContextMenu = setContextMenu

    const handler = ({ target }: { target: any }) =>
      ref.current && !ref.current.contains(target) && setContextMenu([])

    document.addEventListener(`mousedown`, handler)

    return () => document.removeEventListener(`mousedown`, handler)
  }, [ref])

  return arr.length > 2 ? (
    <div
      ref={ref}
      className="absolute z-1 w200 bgc333 p3"
      style={{ inset: `${arr[1]}px auto auto ${arr[0]}px` }}
    >
      {arr.slice(2).map(([fn, text, show = true]: any) =>
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
