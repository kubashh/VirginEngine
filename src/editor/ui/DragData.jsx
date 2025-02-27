import { useEffect, useState } from "react"

export const DragData = () => {
  return
  const [[label, data], setDragData] = useState([``, {}])
  const [mouse, setMouse] = useState({})

  //console.log(label, data)

  window.editor.setDragData = setDragData
  window.editor.dragData = data

  useEffect(() => {
    if (!label) {
      return
    }

    const handleMouseMove = ({ clientX, clientY }) =>
      setMouse({ left: clientX + 3, top: clientY + 3 })

    window.addEventListener(`mousemove`, handleMouseMove)

    return () => window.removeEventListener(`mousemove`, handleMouseMove)
  })

  /*useEffect(() => {
    if (!label) {
      return
    }

    const handleMouseUp = () => {
      setDragData([])
      window.editor.dragCb(data)
      window.editor.dragData = {}
    }

    window.addEventListener(`mouseup`, handleMouseUp)

    return () => window.removeEventListener(`mouseup`, handleMouseUp)
  })*/

  return label ? (
    <div style={{ position: `absolute`, ...mouse }}>{label}</div>
  ) : null
}
