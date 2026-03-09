import Window from "../components/Window";
import InspectorSection from "./InspectorSection";
import { config, inspectorSignal } from "../lib/consts";
import { loadProject, saveProject } from "../lib/util";
import { build, test } from "../build/build";

const editorOpctions = {
  Test: test,
  Save: saveProject,
  Build: build,
  Load: loadProject,
  Config: () => inspectorSignal.set(<Config />),
};

function Config() {
  return (
    <InspectorSection
      text="Config"
      childs={Object.keys(config)
        .filter((key) => key !== `type`)
        .map((key) => ({ text: key, object: config, access: key }))}
    />
  );
}

export default function Inspector() {
  return (
    <Window
      name="Inspenctor"
      className="row-span-2 w-(--w3) border-l border-zinc-400"
      headerOptions={editorOpctions}
    >
      <div className="p-2 overflow-y-scroll">
        <InspectorComponent />
      </div>
    </Window>
  );
}

function InspectorComponent() {
  const inspector = inspectorSignal.use();
  return inspector;
}
