import { useEffect, useState } from "react"
import { GameObject } from "./GameObject"

export const Hierarchy = () => {
  const [state, setState] = useState(0)

  useEffect(() => {
    window.editor.reloadHierarchy = () => {
      setState(state + 1)
      window.editor.setInspector(<div />)
    }
  })

  return (
    <div
      style={{
        overflow: `scroll`,
        userSelect: `none`
      }}
    >
      <GameObject
        object={window.files.Scenes[window.editor.selectedScene]}
        name={window.editor.selectedScene}
        main
      />
    </div>
  )
}
