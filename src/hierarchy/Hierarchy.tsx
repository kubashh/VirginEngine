import Window from "../components/Window"
import GameObject from "./GameObject"
import { currentScene, files, inspector } from "../lib/consts"

function HierarchyComponent() {
  currentScene.bind(() => (inspector.value = null))

  return (
    <GameObject object={currentScene.value} old={files.value.Scenes} name={currentScene.value.name} deep={0} />
  )
}

export default function Hierarchy() {
  return (
    <Window name="Hierarchy" className="w-(--width2) h-(--height1) border-b-1 border-zinc-400">
      <div className="overflow-y-scroll">
        <HierarchyComponent />
      </div>
    </Window>
  )
}
