import { GameObject } from "./GameObject"
import { editor, files } from "../../lib/consts"
import { useRefresh } from "../../lib/hooks"
import { Header } from "../../lib/components"

export const Hierarchy = () => {
  const refresh = useRefresh()

  editor.reloadHierarchy = () => {
    editor.setInspector()
    refresh()
  }

  return (
    <>
      <Header text="Hierarchy" />
      <div style={{ overflow: `scroll`, userSelect: `none` }}>
        <GameObject
          object={files.Scenes[editor.selectedScene]}
          name={editor.selectedScene}
          main
        />
      </div>
    </>
  )
}
