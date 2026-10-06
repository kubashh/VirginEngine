import { createSignal } from "../lib/framework";
import { Window } from "../components/Window";
import { Node } from "./Node";
import { setInspector } from "../inspector/Inspector";
import { files, type TFile } from "../lib/consts";
import { useRefresh } from "../lib/hooks";

const hierarchySignal = createSignal<TFile>(files.Scenes.MainScene, () => {
  setInspector(null); // close inspector
});

const refreshHierarchyRef = { refresh() {} };

export function setHierarchy(file: TFile) {
  hierarchySignal.set(file);
}

export function refreshHierarchy() {
  refreshHierarchyRef.refresh();
}

export function Hierarchy() {
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
  refreshHierarchyRef.refresh = useRefresh();

  return <Node object={currentScene} parent={files.Scenes} name={currentScene.name} deep={0} />;
}
