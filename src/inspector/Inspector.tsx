import { createSignal } from "../lib/framework";
import { config } from "../lib/consts";
import { buildProject } from "../lib/util";
import { Window } from "../lib/components/Window";
import { showDocs } from "../docs/Docs";
import { InspectorSection } from "./InspectorSection";
import { saveProject, saveProjectFile, setSetUp } from "../ui/LoadData";
import { testProjects } from "../ui/Test";

const inspectorSignal = createSignal<React.ReactNode>(null);

const editorOpctions = {
  Docs: showDocs,
  Test: testProjects,
  Config: () => inspectorSignal.set(<Config />),
  File: {
    Save: () => saveProject(),
    SaveToFile: () => saveProjectFile(),
    Build: buildProject,
    Load: () => setSetUp(false),
  },
};

export function setInspector(node: React.ReactNode) {
  inspectorSignal.set(node);
}

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

export function Inspector() {
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
