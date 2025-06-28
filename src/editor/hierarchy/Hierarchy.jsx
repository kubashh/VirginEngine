import GameObject from "./GameObject"
import { editor, files } from "../../lib/consts"
import { useRefresh } from "../../lib/hooks"
import { Header } from "../../lib/components"

function HierarchyComponent() {
  const refresh = useRefresh()

  editor.reloadHierarchy = () => {
    editor.setInspector()
    refresh()
  }

  return <GameObject object={editor.selectedScene} old={files.Scenes} name={editor.selectedSceneName} main />
}

export default function Hierarchy() {
  return (
    <section className="hierarchy">
      <Header text="Hierarchy" />
      <div>
        <HierarchyComponent />
      </div>
    </section>
  )
}
