import GameObject from "./GameObject"
import Header from "../components/Header"
import { currentScene, files, inspector } from "../lib/consts"

function HierarchyComponent() {
  currentScene.bind(() => (inspector.value = null))

  return (
    <GameObject object={currentScene.value} old={files.value.Scenes} name={currentScene.value.name} deep={0} />
  )
}

export default function Hierarchy() {
  return (
    <section className="hierarchy border-b-1 border-solid border-zinc-400">
      <Header text="Hierarchy" />
      <div className="overflow-y-scroll">
        <HierarchyComponent />
      </div>
    </section>
  )
}
