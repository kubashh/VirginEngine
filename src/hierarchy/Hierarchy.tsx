import { useRefresh } from "wdwh/hooks";
import Window from "../components/Window";
import Node from "./Node";
import { hierarchySignal, files, refreshHierarchy } from "../lib/consts";

export default function Hierarchy() {
  return (
    <Window name="Hierarchy" className="w-(--w2) h-(--h1) border-b border-zinc-400">
      <div className="scrollbar-y">
        <HierarchyComponent />
      </div>
    </Window>
  );
}

function HierarchyComponent() {
  const currentScene = hierarchySignal.use();
  refreshHierarchy.refresh = useRefresh();

  return <Node object={currentScene} parent={files.Scenes} name={currentScene.name} deep={0} />;
}
