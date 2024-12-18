import { useState } from "react"
import { useHover } from "../../lib/useHover"

export const GameObject = ({ old, object, main, deep = 0 }) => {
  const [open, setOpen] = useState(main && true)
  const hover = useHover({
    color: `#555`
  })

  const { name, childs } = object

  const haveChilds = childs && childs.length > 0

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

  const onContextMenu = () => {

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

    if(!dragData || dragData.from !== `hierarchy` || dragData.name === name) {
      return
    }

    if(!childs) {
      object.childs = []
    } else {
      let condition = false
  
      for(const child of object.childs) {
        if(child.name === dragData.name) {
          condition = true
          break
        }
      }
  
      if(condition) {
        return
      }
    }

    object.childs.push(dragData.file)
    dragData.old.childs.splice(dragData.old.childs.indexOf(dragData.file), 1)
    if(dragData.old.childs.length === 0) {
      delete dragData.old.childs
    }
    window.editor.dragData = {}
    window.editor.reloadHierarchy()
  }

  return <>
    {!main && <div
      style={{
        marginLeft: deep * 10,
        display: `flex`,
        flexDirection: `row`,
        "&:hover": {
          color: `blue`
        },
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
          hover: {
            color: `blue`
          },
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
      {childs.map((newObject) => {
        return <GameObject
          old={object}
          object={newObject}
          key={newObject.name}
          deep={deep + 1}
        />
      })}
    </>}
  </>
}