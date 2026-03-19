import { useEffect } from "react";
import { useRefresh } from "wdwh/hooks";
import Window from "../components/Window";
import Node from "./Node";
import { hierarchySignal, files, inspectorSignal, refreshHierarchy } from "../lib/consts";

function HierarchyComponent() {
  const currentScene = hierarchySignal.use();
  refreshHierarchy.refresh = useRefresh();

  // Close inspector
  useEffect(() => {
    inspectorSignal.set(null);
  }, [currentScene]);

  return <Node object={currentScene} old={files.Scenes} name={currentScene.name} deep={0} />;
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
