import Window from "../components/Window";
import { createSignal } from "../lib/framework";
import { testSceneSignal } from "../lib/consts";
import { testProjects } from "../lib/util";

const opctions = [`16/9`, `1/1`, `9/16`];
const aspectRatioSignal = createSignal(opctions[0]);

const headerOptions = {
  ...opctions.reduce((old, key) => ({ ...old, [key]: () => aspectRatioSignal.set(key) }), {}),
  Restart: () => {
    testSceneSignal.set(``);
    setTimeout(testProjects);
    console.clear();
  },
  Exit: () => {
    testSceneSignal.set(``);
    console.clear();
  },
};

testSceneSignal.subscribe(() => {
  const element = document.getElementById(`test`);
  if (element) {
    element.style.display = testSceneSignal.get() ? `` : `none`;
  }

  const iframeElement = document.getElementById(`test-frame`);
  if (iframeElement instanceof HTMLIFrameElement) {
    iframeElement.srcdoc = testSceneSignal.get();
  }
});

aspectRatioSignal.subscribe(() => {
  const iframeElement = document.getElementById(`test-frame`);
  if (iframeElement instanceof HTMLIFrameElement) {
    iframeElement.style.aspectRatio = aspectRatioSignal.get();
  }
});

export default function Test() {
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
