import { GameObject } from "./GameObject"
import { editor } from "../../lib/consts"
import { useRefresh } from "../../lib/hooks"
import { Header } from "../../lib/components"

const HierarchyComponent = () => {
  const refresh = useRefresh()

  editor.reloadHierarchy = () => {
    editor.setInspector()
    refresh()
  }

  return (
    <div style={{ overflow: `scroll`, userSelect: `none` }}>
      <GameObject
        object={editor.selectedScene}
        name={editor.selectedSceneName}
        main
      />
    </div>
  )
}

export const Hierarchy = () => (
  <div className="hierarchy">
    <Header text="Hierarchy" />
    <HierarchyComponent />
  </div>
)
