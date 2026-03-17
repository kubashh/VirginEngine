import Window from "../components/Window";
import Node from "./Node";
import { currentScene, files, inspectorSignal } from "../lib/consts";

function HierarchyComponent() {
  currentScene.bind(() => inspectorSignal.set(null));

  return <Node object={currentScene.value} old={files.Scenes} name={currentScene.value.name} deep={0} />;
}

export default function Hierarchy() {
  return (
    <Window name="Hierarchy" className="w-(--w2) h-(--h1) border-b border-zinc-400">
      <div className="overflow-y-scroll">
        <HierarchyComponent />
      </div>
    </Window>
  );
}
