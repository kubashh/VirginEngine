import { useState } from "react"
import { useHover } from "../../lib/useHover"

export const GameObject = ({ old, name, object, main, deep = 0 }) => {
  const [open, setOpen] = useState(main && true)
  const hover = useHover({
    color: `#555`
  })

  const { type, ...childs } = object

  const haveChilds = Object.keys(childs)?.length > 0

  const onClick = () => {
    window.editor.setInspector(<div
      style={{
        margin: 12
      }}
    >
      <h2>GameObject</h2>
      <div>{`Name: ${name}`}</div>
    </div>)
  }

  const onContextMenu = ({ pageX, pageY }) => {
    window.editor.setContextMenu({
      x: pageX,
      y: pageY,
      arr: [[`New Objext`, () => {
        window.editor.setNameInput([``, (newText) => {
          if(Object.keys(object).includes(newText)) {
            return
          }

          object[newText] = {
            type: `gameObject`
          }

          window.editor.reloadHierarchy()
        }])
      }],
      [`Rename`, () => {
        window.editor.setNameInput([name, (newText) => {
          if(name === newText) {
            return
          }

          if(old[newText]) {
            console.error(`Error`)
          } else {
            delete old[name]
            old[newText] = object
            window.editor.reloadHierarchy()
          }
        }])
      }],
      [`Delete`, () => {
        delete old[name]
        window.editor.reloadHierarchy()
      }]
    ]})
  }

  const onMouseDown = () => {
    window.editor.dragData = {
      from: `hierarchy`,
      old,
      file: object,
      name
    }
  }

  const onMouseUp = () => {
    const { dragData } = window.editor

    if(!dragData || dragData.name === name || dragData.file.type !== `gameObject`) {
      return
    }

    for(const key in childs) {
      if(key === dragData.name) {
        return
      }
    }

    object[dragData.name] = dragData.file
    if(dragData.from === `hierarchy`) {
      delete dragData.old[dragData.name]
    }

    window.editor.dragData = {}
    window.editor.reloadHierarchy()
  }

  return <>
    {!main && <div
      style={{
        marginLeft: deep * 10,
        display: `flex`,
        flexDirection: `row`
      }}
    >
      {haveChilds && <div
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
        onClick={() => {
          haveChilds && setOpen(!open)
        }}
      >
        {`>`}
      </div>}
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
      >{name}</div>
    </div>}
    {haveChilds && open && <>
      {Object.entries(childs).map(([key, value]) => {
        return <GameObject
          old={object}
          object={value}
          key={key}
          name={key}
          deep={deep + 1}
        />
      })}
    </>}
  </>
}