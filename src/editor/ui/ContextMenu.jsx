import { useEffect, useState } from "react"

// Nie dziala y height
// TODO usunięcie context menu
document.addEventListener(`mousedown`, ({ pageX, pageY }) => {
  const { contextMenu } = window.data
  if(!contextMenu) {
    return
  }

  const { width, x, y } = contextMenu
  if(!(x <= pageX && pageX <= x + width && y <= pageY)) {
    window.data.setContextMenu({})
  }
})

export const ContextMenu = () => {
  const [{ x, y, arr }, setContextMenu] = useState({})

  const width = 200

  useEffect(() => {
    window.data.setContextMenu = (props) => {
      window.data.contextMenu = {
        ...props,
        width
      }
      setContextMenu(props)
    }
  })

  return arr && arr.length ? <div
    onClick={() => {
      window.data.showContextMenu = true
    }}
    style={{
      position: "absolute",
      zIndex: 1,
      left: x,
      top: y,
      width,
      backgroundColor: "#333",
      border: "3px solid #333"
    }}
  >
    {arr.map(([text, fn]) => {
      return <div
      key={text}
        onClick={() => {
          console.log(`test`)
          //removeContextMenu()
        }}
        style={{
          cursor: "pointer",
          "&:hover": {
            backgroundColor: "#333"
          }
        }}
      >
        {text}
      </div>
    })}
  </div> : <div></div>
}