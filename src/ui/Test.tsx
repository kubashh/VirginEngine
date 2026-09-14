import { clsx, createSignal } from "wdwh";
import Window from "../components/Window";
import { testSceneSignal } from "../lib/consts";
import { testProjects } from "../lib/util";

const opctions = { "16/9": `aspect-[16/9]`, "1/1": `aspect-square`, "9/16": `aspect-[9/16]` };
const aspectRatioSignal = createSignal(opctions[`16/9`]);

const headerOptions = {
  ...Object.entries(opctions).reduce(
    (old, [key, value]) => ({ ...old, [key]: () => aspectRatioSignal.set(value) }),
    {},
  ),
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
        <TestScreen />
      </div>
    </Window>
  );
}

function TestScreen() {
  const testScene = testSceneSignal.use();
  const aspectRatio = aspectRatioSignal.use();
  return (
    <iframe
      title="scene"
      className={clsx(`box-content border-x border-zinc-400`, aspectRatio)}
      srcDoc={testScene}
    />
  );
}
