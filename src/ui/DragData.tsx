import { useEffect, useState } from "react"
import { dragData, editor } from "../lib/consts"

function useDragData() {
  dragData.bind()
  const [mouse, setMouse] = useState<{ left: number; top: number } | undefined>()

  function handleMouseMove({ clientX, clientY }: MouseEvent) {
    setMouse({ left: clientX + 3, top: clientY + 3 })
  }

  function setDragData(newData: Obj, event: MouseEvent) {
    // @ts-ignore
    dragData.value = event?.button === 0 ? newData : undefined

    handleMouseMove(event || { clientX: 0, clientY: 0 })
  }

  // @ts-ignore
  editor.setDragData = setDragData

  useEffect(() => {
    if (!dragData.value) return

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
  return { style: mouse }
}

export default function DragData() {
  const props = useDragData()

  return dragData.value ? (
    <div className="absolute z-1 bgc000_50p" {...props}>
      {dragData.value.name}
    </div>
  ) : null
}
