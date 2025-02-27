import { useState } from "react"
import { useHover } from "../../lib/useHover"
import { setComponents } from "./components/setComponents"
import { DGO } from "../../setUp/DefaulfScene"
import { isFirstUpperCase } from "../../lib/isFirstUpperCase"

export const GameObject = ({ old, name, object, main, deep = 0 }) => {
  const [open, setOpen] = useState(main)
  const hover = useHover({ color: `#555` })

  const childs = {}

  for (const key in object) {
    if (!window.editor.keywords.includes(key) && isFirstUpperCase(key)) {
      childs[key] = object[key]
    }
  }

  const haveChilds = Object.keys(childs)?.length > 0

  const onClick = () => {
    if (main) {
      return
    }

    setComponents({
      old,
      object,
      name
    })
  }

  const onContextMenu = ({ pageX, pageY }) => {
    window.editor.setContextMenu({
      x: pageX,
      y: pageY,
      arr: [
        [
          `New Object`,
          () => {
            window.editor.setNameInput([
              ``,
              (newText) => {
                if (Object.keys(object).includes(newText)) {
                  return
                }

                object[newText] = DGO()

                setOpen(true)
                window.editor.reloadHierarchy()
              }
            ])
          }
        ],
        [
          `Rename`,
          () => {
            window.editor.setNameInput([
              name,
              (newText) => {
                if (name === newText) {
                  return
                }

                if (main) {
                  old = window.files.scenes
                  window.editor.selectedScene = newText
                }

                if (old[newText]) {
                  console.log(`Error`)
                  return
                }

                delete old[name]
                old[newText] = object
                window.editor.reloadHierarchy()
              }
            ])
          },
          !main
        ],
        [
          `Delete`,
          () => {
            delete old[name]
            window.editor.reloadHierarchy()
          },
          !main
        ]
      ]
    })
  }

  const onMouseDown = () => {
    window.editor.dragData = !main && {
      from: `hierarchy`,
      old,
      file: object,
      name
    }
  }

  const onMouseUp = () => {
    const { dragData } = window.editor

    if (
      !dragData ||
      dragData.name === name ||
      dragData.file.type !== `gameObject`
    ) {
      return
    }

    for (const key in childs) {
      if (key === dragData.name) {
        return
      }
    }

    object[dragData.name] = dragData.file
    if (dragData.from === `hierarchy` && dragData.old) {
      delete dragData.old[dragData.name]
    }

    window.editor.dragData = {}
    window.editor.reloadHierarchy()
  }

  return (
    <>
      {
        <div
          style={{
            marginLeft: deep * 10,
            display: `flex`,
            flexDirection: `row`
          }}
        >
          {haveChilds && (
            <div
              style={{
                cursor: `pointer`,
                width: 24,
                height: 24,
                textAlign: `center`,
                justifySelf: `center`,
                borderRadius: 12,
                transform: `rotate(${open ? 90 : 0}deg)`,
                transition: `transform 150ms`
              }}
              onClick={() => haveChilds && setOpen(!open)}
            >
              {`>`}
            </div>
          )}
          <div
            {...hover}
            style={{
              cursor: `pointer`,
              marginLeft: !haveChilds && 24,
              ...hover.style
            }}
            onClick={onClick}
            onContextMenu={onContextMenu}
            onMouseDown={onMouseDown}
            onMouseUp={onMouseUp}
          >
            {name}
          </div>
        </div>
      }
      {haveChilds &&
        open &&
        Object.entries(childs).map(([key, value]) => (
          <GameObject
            old={object}
            object={value}
            key={key}
            name={key}
            deep={deep + 1}
          />
        ))}
    </>
  )
}
