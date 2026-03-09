import clsx from "clsx";
import { createSignal } from "wdwh/signal";
import Window from "../components/Window";
import { testSceneSignal } from "../lib/consts";
import { test } from "../build/build";

const opctions = { "16/9": `aspect-[16/9]`, "1/1": `aspect-square`, "9/16": `aspect-[9/16]` };
const aspectRatioSignal = createSignal(opctions[`16/9`]);

export default function Test() {
  const testScene = testSceneSignal.use();
  const aspectRatio = aspectRatioSignal.use();

  if (!testScene) return;

  return (
    <Window
      name="Test"
      className="absolute z-1 w-screen h-screen"
      headerOptions={{
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
      }}
    >
      <div className="flex justify-center bg-zinc-950">
        <iframe
          title="scene"
          className={clsx(`box-content border-x border-zinc-400`, aspectRatio)}
          srcDoc={testScene}
        />
      </div>
    </Window>
  );
}
