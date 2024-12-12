import { useState } from "react"
import { createPortal } from "react-dom"

// Nie dziala!!!!!!!!!!!!!
const createMenu = ({ x, y, content }) => {
  const element = <div
    style={{
      display: "absolute",
      top: x,
      left: y,
      width: 200,
      height: 300,
      backgroundColor: "#333"
    }}
  >
    {`${x}, ${y}, ${content.length}`}
  </div>
  createPortal(element , window.data.root)
  console.log(element)
}

export const File = ({ file, name, main, deep = 0 }) => {
  const [open, setOpen] = useState(true)

  return <>
    {!main && <div
      style={{
        cursor: "pointer",
        marginLeft: deep * 10,
        display: "flex",
        flexDirection: "row"
      }}
      onClick={() => {
        setOpen(!open)
      }}
      onContextMenu={(e) => {
        e.preventDefault() // prevent the default behaviour when right clicked
        console.log("Right Click")

        createMenu({  // Nie dziala
          x: e.pageX,
          y: e.pageY,
          content: [3, 4, 5]
        })
      }}

    >
      {file.type === `folder` && <div
        style={{
          width: 24,
          height: 24,
          textAlign: "center",
          justifySelf: "center",
          borderRadius: 12,
          transform: `rotate(${open ? 90 : 0}deg)`,
          transition: "transform 150ms"
        }}
      >
        {">"}
      </div>}
      <div
        style={{
          marginLeft: file.type !== `folder` && 24
        }}
      >{name}</div>
    </div>}
    {file.type === `folder` && open && <>
      {Object.entries(file).map(([key, value]) => {
        if(key === `type`) {
          return null
        }
        return <File
          file={value}
          name={key}
          key={key}
          deep={deep + 1}
        />
      })}
    </>}
  </>
}