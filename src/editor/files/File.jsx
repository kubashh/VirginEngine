import { useState } from "react"
import { useHover } from "../../lib/hooks"
import { isFirstUpperCase } from "../../lib/utils"
import { openScene } from "../../lib/utils"
import { editor } from "../../lib/consts"
import { Arrow } from "../../lib/components"

export const File = ({ old, file, name, main, deep = 0 }) => {
  const [open, setOpen] = useState(main)
  const hover = useHover({ color: `#555` })

  const isFolder = file.type === `folder`

  const onClick = () => {
    editor.setInspector(
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
        editor.setNameInput([
          ``,
          (newText) => {
            file[newText] = {
              type
            }

            setOpen(true)
            editor.reloadFiles()
          }
        ])
      },
      isFolder
    ]

    editor.setContextMenu({
      x: pageX,
      y: pageY,
      arr: [
        newArrElement(`New file`, `txt`),
        newArrElement(`New folder`, `folder`),
        newArrElement(`New scene`, `scene`),
        [
          `Rename`,
          () => {
            editor.setNameInput([
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
                  editor.reloadFiles()
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
            editor.reloadFiles()
          },
          name !== `files`
        ]
      ]
    })
  }

  const onMouseDown = (event) =>
    !main && editor.setDragData({ from: `files`, old, file, name }, event)

  const onMouseUp = () => {
    if (!isFolder) return

    const { dragData } = editor

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

    editor.reloadFiles()
  }

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
    Object.entries(file).map(
      ([key, value]) =>
        isFirstUpperCase(key) && (
          <File old={file} file={value} name={key} key={key} deep={deep + 1} />
        )
    )

  return (
    <>
      <div
        style={{
          marginLeft: deep * 10,
          display: `flex`,
          flexDirection: `row`
        }}
      >
        {Arrow(open, setOpen, isFolder)}
        {element}
      </div>
      {childsElement}
    </>
  )
}
