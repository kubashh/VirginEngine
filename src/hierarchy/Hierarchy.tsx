import GameObject from "./GameObject"
import Header from "../components/Header"
import { currentScene, editor, files, inspector } from "../lib/consts"

function HierarchyComponent() {
  currentScene.bind(() => (inspector.value = null))

  return <GameObject object={currentScene.value} old={files.Scenes} name={editor.selectedSceneName} deep={0} />
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
