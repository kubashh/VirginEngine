import { useEffect, useState } from "react"

export const Drag = () => {
  const [cursorPosition, setCursorPosition] = useState({ left: 0, top: 0 })
  const { dragData } = window.editor

  useEffect(() => {
    const handler = ({ screenX, screenY }) => {
      setCursorPosition({ left: screenX, top: screenY })
    }

    document.addEventListener(`mousemove`, handler)

    return () => {
      document.removeEventListener(`mousemove`, handler)
    }
  })

  return <div
    style={{
      position: `absolute`,
      ...cursorPosition
    }}
  >
    {dragData && dragData.name}
  </div>
}