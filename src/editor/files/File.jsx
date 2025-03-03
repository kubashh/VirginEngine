import { useState } from "react"
import { useHover } from "../../lib/hooks"
import { isFirstUpperCase } from "../../lib/utils"
import { openScene } from "../../lib/utils"

export const File = ({ old, file, name, main, deep = 0 }) => {
  const [open, setOpen] = useState(main)
  const hover = useHover(
    { marginLeft: file.type !== `folder` && 24 },
    { color: `#555` }
  )

  const isFolder = file.type === `folder`

  const onClick = () => {
    window.editor.setInspector(
      <div style={{ margin: 12 }}>
        <h2>File</h2>
        <div>{`Type: ${file.type}`}</div>
        <div>{`Name: ${name}`}</div>
      </div>
    )
  }

  const onContextMenu = ({ pageX, pageY }) => {
    const newArrElement = (name, type) => [
      name,
      () => {
        window.editor.setNameInput([
          ``,
          (newText) => {
            file[newText] = {
              type
            }

            setOpen(true)
            window.editor.reloadFiles()
          }
        ])
      },
      isFolder
    ]

    window.editor.setContextMenu({
      x: pageX,
      y: pageY,
      arr: [
        newArrElement(`New file`, `txt`),
        newArrElement(`New folder`, `folder`),
        newArrElement(`New scene`, `scene`),
        [
          `Rename`,
          () => {
            window.editor.setNameInput([
              name,
              (newText) => {
                if (name === newText) {
                  return
                }

                if (old[newText]) {
                  console.error(`Error`)
                } else {
                  delete old[name]
                  old[newText] = file
                  window.editor.reloadFiles()
                }
              }
            ])
          },
          name !== `files`
        ],
        [
          `Delete`,
          () => {
            delete old[name]
            window.editor.reloadFiles()
          },
          name !== `files`
        ]
      ]
    })
  }

  const onMouseDown = (event) =>
    !main &&
    window.editor.setDragData(
      {
        from: `files`,
        old,
        file,
        name
      },
      event
    )

  const onMouseUp = () => {
    if (!isFolder) return

    const { dragData } = window.editor

    if (
      dragData?.from !== `files` ||
      dragData.name === name ||
      file[dragData.name]
    )
      return

    file[dragData.name] = dragData.file
    if (dragData.old) {
      delete dragData.old[dragData.name]
    }

    window.editor.reloadFiles()
  }

  const arrow = isFolder && (
    <div
      style={{
        width: 24,
        height: 24,
        textAlign: `center`,
        justifySelf: `center`,
        borderRadius: 12,
        transform: `rotate(${open ? 90 : 0}deg)`,
        transition: `transform 150ms`
      }}
      onClick={() => isFolder && setOpen(!open)}
    >
      {`>`}
    </div>
  )

  const element = (
    <div
      {...hover}
      onClick={onClick}
      onContextMenu={onContextMenu}
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
      onDoubleClick={() => {
        if (file.type === `scene`) {
          openScene(name)
        }
      }}
    >
      {name}
    </div>
  )

  const childsElement =
    isFolder &&
    open &&
    file.type !== `scene` &&
    Object.entries(file)
      .filter(([key]) => isFirstUpperCase(key))
      .map(([key, value]) => (
        <File old={file} file={value} name={key} key={key} deep={deep + 1} />
      ))

  return (
    <>
      <div
        style={{
          cursor: `pointer`,
          marginLeft: deep * 10,
          display: `flex`,
          flexDirection: `row`
        }}
      >
        {arrow}
        {element}
      </div>
      {childsElement}
    </>
  )
}
