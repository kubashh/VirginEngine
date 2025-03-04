import { useEffect, useState } from "react"
import { GameObject } from "./GameObject"
import { editor, files } from "../../lib/consts"

export const Hierarchy = () => {
  const [, setState] = useState(0)

  useEffect(() => {
    editor.reloadHierarchy = () => {
      editor.setInspector()
      setState((prev) => prev + 1)
    }
  })

  return (
    <div style={{ overflow: `scroll`, userSelect: `none` }}>
      <GameObject
        object={files.Scenes[editor.selectedScene]}
        name={editor.selectedScene}
        main
      />
    </div>
  )
}
