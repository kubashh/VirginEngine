import { Window } from "../components/Window";
import { testProjects } from "../lib/util";

const opctions = [`16/9`, `1/1`, `9/16`];

function setAspectRation(ratio: string) {
  const iframeElement = document.getElementById(`test-frame`);
  if (iframeElement instanceof HTMLIFrameElement) {
    iframeElement.style.aspectRatio = ratio;
  }
}

export function setTestSceneSignal(srcdoc: string) {
  const element = document.getElementById(`test`);
  if (element) {
    element.style.display = srcdoc ? `` : `none`;
  }

  const iframeElement = document.getElementById(`test-frame`);
  if (iframeElement instanceof HTMLIFrameElement) {
    iframeElement.srcdoc = srcdoc;
  }
}

const headerOptions = {
  ...opctions.reduce((old, key) => ({ ...old, [key]: () => setAspectRation(key) }), {}),
  Restart: () => {
    setTestSceneSignal(``);
    setTimeout(testProjects);
    console.clear();
  },
  Exit: () => {
    setTestSceneSignal(``);
    console.clear();
  },
};

export function Test() {
  return (
    <Window
      name="Test"
      id="test"
      className="w-screen h-screen"
      style={{ display: `none` }} // default hidden
      headerOptions={headerOptions}
    >
      <div className="flex justify-center bg-zinc-950">
        <iframe
          title="scene"
          id="test-frame"
          className="box-content border-x border-zinc-400"
          style={{ aspectRatio: opctions[0] }}
        />
      </div>
    </Window>
  );
}
