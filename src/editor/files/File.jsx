import { useState } from "react"
import { useHover } from "../../lib/useHover"

export const File = ({ old, file, name, main, deep = 0 }) => {
  const [open, setOpen] = useState(main && true)
  const hover = useHover({
    color: `#555`
  })

  const isFolder = file.type === `folder`

  const onClick = () => {
    window.editor.setInspector(<div
      style={{
        margin: 12
      }}
    >
      <h2>File</h2>
      <div>{`Type: ${file.type}`}</div>
      <div>{`Name: ${name}`}</div>
    </div>)
  }

  const onContextMenu = ({ pageX, pageY }) => {
    window.editor.setContextMenu({
      x: pageX,
      y: pageY,
      arr: [[`New file`, () => {
        window.editor.setNameInput([``, (newText) => {
          const [newName, extension = `txt`, ...rest] = newText.split(`.`)

          if(!newName || rest.length > 0) {
            return
          }

          file[newName] = {
            type: extension
          }

          window.editor.reloadFiles()
        }])
      }, isFolder], [`New folder`, () => {
        window.editor.setNameInput([``, (newText) => {
          if(!window.editor.alphabet.includes(newText[0].toLowerCase())) {
            return
          }

          for(let i = 1; i < newText.length; i++) {
            if(!`${window.editor.alphabet}-_${window.editor.numbers}`.includes(newText[i].toLowerCase())) {
              return
            }
          }

          file[newText] = {
            type: `folder`
          }

          window.editor.reloadFiles()
        }])
      }, isFolder], [`Rename`, () => {
        window.editor.setNameInput([name, (newText) => {
          if(name === newText) {
            return
          }

          if(old[newText]) {
            console.error(`Error`)
          } else {
            delete old[name]
            old[newText] = file
            window.editor.reloadFiles()
          }
        }])
      }], [`Delete`, () => {
        delete old[name]
        window.editor.reloadFiles()
      }]]
    })
  }

  const onMouseDown = () => {
    window.editor.dragData = {
      from: `files`,
      old,
      file,
      name
    }
  }

  const onMouseUp = () => {
    const { dragData } = window.editor

    if(dragData.from !== `files` || !isFolder || dragData.name === name || file[dragData.name]) {
      return
    }

    file[dragData.name] = dragData.file
    delete dragData.old[dragData.name]
    window.editor.dragData = {}
    window.editor.reloadFiles()
  }

  return <>
    {!main && <div
      style={{
        cursor: `pointer`,
        marginLeft: deep * 10,
        display: `flex`,
        flexDirection: `row`
      }}
      onContextMenu={onContextMenu}
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
    >
      {isFolder && <div
        style={{
          width: 24,
          height: 24,
          textAlign: `center`,
          justifySelf: `center`,
          borderRadius: 12,
          transform: `rotate(${open ? 90 : 0}deg)`,
          transition: `transform 150ms`
        }}
        onClick={() => {
          isFolder && setOpen(!open)
        }}
      >
        {`>`}
      </div>}
      <div
      {...hover}
        style={{
          marginLeft: file.type !== `folder` && 24,
          ...hover.style
        }}
        onClick={onClick}
      >{name}</div>
    </div>}
    {isFolder && open && <>
      {Object.entries(file).filter(([key]) => key !== `type`).map(([key, value]) => {
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