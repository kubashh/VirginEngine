import { useEffect, useState } from "react"
import { editor } from "../lib/consts"

function useDragData() {
  const [mouse, setMouse] = useState<{ left: number; top: number } | undefined>()

  function handleMouseMove({ clientX, clientY }: MouseEvent) {
    setMouse({ left: clientX + 3, top: clientY + 3 })
  }

  function setDragData(newData: Obj, event: MouseEvent) {
    // @ts-ignore
    editor.dragData = event?.button === 0 ? newData : undefined

    handleMouseMove(event || { clientX: 0, clientY: 0 })
  }

  // @ts-ignore
  editor.setDragData = setDragData

  useEffect(() => {
    if (!editor.dragData) return

    window.addEventListener(`mousemove`, handleMouseMove)
    // @ts-ignore
    window.addEventListener(`mouseup`, setDragData)

    return () => {
      window.removeEventListener(`mousemove`, handleMouseMove)
      // @ts-ignore
      window.removeEventListener(`mouseup`, setDragData)
    }
  })

  // @ts-ignore
  return { children: editor.dragData?.name, style: mouse }
}

export default function DragData() {
  const props = useDragData()

  return props.children ? <div className="zAbsolute bgc000_50p" {...props} /> : null
}
