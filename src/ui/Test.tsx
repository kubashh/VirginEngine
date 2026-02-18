import clsx from "clsx"
import { useSignal } from "@kubashh/signal"
import Window from "../components/Window"
import { testScene } from "../lib/consts"
import { test } from "../build/build"

const opctions = { "16/9": `aspect-[16/9]`, "1/1": `aspect-square`, "9/16": `aspect-[9/16]` }

export default function Test() {
  testScene.bind(() => console.clear())
  const aspectRatio = useSignal(opctions[`16/9`])

  if (!testScene.value) return

  return (
    <Window
      name="Test"
      className="absolute z-1 w-screen h-screen"
      headerOptions={{
        ...Object.entries(opctions).reduce(
          (old, [key, value]) => ({ ...old, [key]: () => (aspectRatio.value = value) }),
          {},
        ),
        Restart: () => {
          testScene.value = `.`
          setTimeout(test)
        },
        Exit: () => (testScene.value = ``),
      }}
    >
      <div className="flex justify-center bg-zinc-950">
        <iframe
          title="scene"
          className={clsx(`box-content border-x border-zinc-400`, aspectRatio.value)}
          srcDoc={testScene.value}
        />
      </div>
    </Window>
  )
}
