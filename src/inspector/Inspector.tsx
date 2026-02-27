import Window from "../components/Window";
import InspectorSection from "./InspectorSection";
import { config, inspector } from "../lib/consts";
import { loadProject, saveProject } from "../lib/util";
import { build, test } from "../build/build";

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

const editorOpctions = {
  Test: test,
  Save: saveProject,
  Build: build,
  Load: loadProject,
  Config: () => (inspector.value = <Config />),
};

function InspectorComponent() {
  inspector.bind();
  return inspector.value;
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
