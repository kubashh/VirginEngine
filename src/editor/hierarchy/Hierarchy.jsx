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

  return <div
    style={{
      overflow: `scroll`,
      userSelect: `none`
    }}
  >
    <GameObject
      object={window.files.scenes[window.editor.seletedScene]}
      main={true}
    />
    <div
      style={{
        cursor: `pointer`
      }}
    >
      + Add New GameObject
    </div>
  </div>
}