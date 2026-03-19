import { clsx, createSignal } from "wdwh";
import Window from "../components/Window";
import { testSceneSignal } from "../lib/consts";
import { test } from "../build/build";

const opctions = { "16/9": `aspect-[16/9]`, "1/1": `aspect-square`, "9/16": `aspect-[9/16]` };
const aspectRatioSignal = createSignal(opctions[`16/9`]);

const headerOptions = {
  ...Object.entries(opctions).reduce(
    (old, [key, value]) => ({ ...old, [key]: () => aspectRatioSignal.set(value) }),
    {},
  ),
  Restart: () => {
    testSceneSignal.set(`.`);
    setTimeout(test);
    console.clear();
  },
  Exit: () => {
    testSceneSignal.set(``);
    console.clear();
  },
};

export default function Test() {
  const testScene = testSceneSignal.use();

  return testScene ? (
    <Window name="Test" className="absolute z-1 w-screen h-screen" headerOptions={headerOptions}>
      <div className="flex justify-center bg-zinc-950">
        <TestScreen />
      </div>
    </Window>
  ) : null;
}

function TestScreen() {
  const aspectRatio = aspectRatioSignal.use();
  return (
    <iframe
      title="scene"
      className={clsx(`box-content border-x border-zinc-400`, aspectRatio)}
      srcDoc={testSceneSignal.get()} // get bacause father is rerenered
    />
  );
}
