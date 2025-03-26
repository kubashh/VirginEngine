import { GameObject } from "./GameObject"
import { editor, files } from "../../lib/consts"
import { useRefresh } from "../../lib/hooks"
import { Header } from "../../lib/components"

const HierarchyComponent = () => {
  const refresh = useRefresh()

  editor.reloadHierarchy = () => {
    editor.setInspector()
    refresh()
  }

  return (
    <div>
      <GameObject
        object={editor.selectedScene}
        old={files.Scenes}
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
