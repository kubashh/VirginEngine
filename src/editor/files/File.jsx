import { useState } from "react"

export const File = ({ old, file, name, main, deep = 0 }) => {
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
      onContextMenu={({ pageX, pageY }) => {
        window.data.setContextMenu({
          x: pageX,
          y: pageY,
          arr: [[`New`, () => {
            console.log(`New`)
          }], [`Rename`, () => {
            console.log(`Rename`)
          }], [`Delete`, () => {
            delete old[name]
            window.data.editor.reloadFiles()
            console.log(`Delete`)
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
          old={file}
          file={value}
          name={key}
          key={key}
          deep={deep + 1}
        />
      })}
    </>}
  </>
}