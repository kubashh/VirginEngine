import { useEffect, useState } from "react"
import { editor } from "../../lib/consts"

export const DragData = () => {
  const [mouse, setMouse] = useState({})

  const handleMouseMove = ({ clientX, clientY }) =>
    setMouse({ left: clientX + 3, top: clientY + 3 })

  const setDragData = (newData, event) => {
    editor.dragData = event?.button === 0 ? newData : undefined

    handleMouseMove(event || { clientX: 0, clientY: 0 })
  }

  editor.setDragData = setDragData

  const handleMouseUp = () => setDragData()

  useEffect(() => {
    if (!editor.dragData) return

    window.addEventListener(`mousemove`, handleMouseMove)
    window.addEventListener(`mouseup`, handleMouseUp)

    return () => {
      window.removeEventListener(`mousemove`, handleMouseMove)
      window.removeEventListener(`mouseup`, handleMouseUp)
    }
  })

  return editor.dragData ? (
    <div
      style={{
        position: `absolute`,
        zIndex: 5,
        backgroundColor: `rgba(0, 0, 0, 0.5)`,
        ...mouse
      }}
      children={editor.dragData.name}
    />
  ) : null
}
