import Window from "../components/Window";
import InspectorSection from "./InspectorSection";
import { config, inspectorSignal, setUpSignal } from "../lib/consts";
import { buildProject, saveProject, testProjects } from "../lib/util";

const editorOpctions = {
  Test: testProjects,
  Load: () => setUpSignal.set(false),
  Config: () => inspectorSignal.set(<Config />),
  File: {
    Save: saveProject,
    SaveToFile: () => saveProject(true),
    Build: buildProject,
  },
};

function Config() {
  return (
    <InspectorSection
      text={`Config (${config.gameName})`}
      childs={Object.keys(config)
        .filter((key) => key !== `type` && key !== `gameName`)
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
      <div className="p-2 scrollbar-y">
        <InspectorComponent />
      </div>
    </Window>
  );
}

function InspectorComponent() {
  const inspector = inspectorSignal.use();
  return inspector;
}
