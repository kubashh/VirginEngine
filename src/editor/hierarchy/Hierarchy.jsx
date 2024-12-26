import { useEffect, useState } from "react"
import { GameObject } from "./GameObject"

export const Hierarchy = () => {
  const [state, setState] = useState(0)

  const reloadHierarchy = () => {
    setState(state + 1)
  }

  useEffect(() => {
    window.editor.reloadHierarchy = reloadHierarchy
  })

  const onClick = () => {
    window.editor.setNameInput([``, (newText) => {
      if(!newText) {
        return
      }

      window.files.scenes[window.editor.seletedScene][newText] = {
        ...window.editor.defaultGameObject
      }

      window.editor.reloadHierarchy()
    }])
  }

  return <div
    style={{
      overflow: `scroll`,
      userSelect: `none`
    }}
  >
    <GameObject
      object={window.files.scenes[window.editor.seletedScene]}
      main={true}
      name={window.editor.seletedScene}
    />
    <div
      style={{
        cursor: `pointer`
      }}
      onClick={onClick}
    >
      + Add New GameObject
    </div>
  </div>
}