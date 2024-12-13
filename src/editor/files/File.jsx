import { useState } from "react"

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
        window.data.setContextMenu({
          x: e.pageX,
          y: e.pageY,
          arr: [[`test`, () => {
            console.log(`test`)
          }]]
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