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
    <div className="scroll">
      <GameObject
        object={editor.selectedScene}
        name={editor.selectedSceneName}
        main
      />
    </div>
  )
}

export const Hierarchy = () => (
  <section id="hierarchy">
    <Header text="Hierarchy" />
    <HierarchyComponent />
  </section>
)
