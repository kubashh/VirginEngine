import { useEffect } from "react"
import { dragData } from "../lib/consts"
import { useSignal } from "../lib/Signal"

function useDragData() {
  dragData.bind()
  const mouse = useSignal<{ left: number; top: number } | undefined>(undefined)

  function handleMouseMove({ clientX, clientY }: MouseEvent) {
    mouse.value = { left: clientX + 3, top: clientY + 3 }
  }

  function handleMouseUp() {
    dragData.value = null
    mouse.value = undefined
  }

  useEffect(() => {
    if (!dragData.value) return

    window.addEventListener(`mousemove`, handleMouseMove)
    window.addEventListener(`mouseup`, handleMouseUp)

    return () => {
      window.removeEventListener(`mousemove`, handleMouseMove)
      window.removeEventListener(`mouseup`, handleMouseUp)
    }
  })

  return { style: mouse.value }
}

export default function DragData() {
  const props = useDragData()

  return props.style ? (
    <div className="absolute z-1 bg-[#0007]" {...props}>
      {dragData.value?.name}
    </div>
  ) : null
}
