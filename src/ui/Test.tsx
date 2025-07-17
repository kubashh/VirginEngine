import Window from "../components/Window"
import { signal } from "../lib/signals"
import { testScene } from "../lib/consts"
import { test } from "../build/build"

const opctions = [`16 / 9`, `1 / 1`, `9 / 16`]

const aspectRatio = signal(opctions[0])

export default function Test() {
  testScene.bind(console.clear)
  aspectRatio.bind()

  if (!testScene.value) return

  return (
    <Window
      name="Test"
      className="absolute z-1 w-screen h-screen"
      headerOptions={{
        ...opctions.reduce((old, value) => ({ ...old, [value]: () => (aspectRatio.value = value) }), {}),
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
          className="border-x-1 border-solid border-zinc-400"
          style={{ height: `min(100%, 100vw * ${aspectRatio.value})`, aspectRatio: aspectRatio.value }}
          srcDoc={testScene.value}
        />
      </div>
    </Window>
  )
}
