import Header from "../components/Header"
import { signal } from "../lib/Signal"
import { testScene } from "../lib/consts"
import { test } from "../build/build"

const opctions = [`16 / 9`, `1 / 1`, `9 / 16`]

const aspectRatio = signal(opctions[0])

export default function Test() {
  testScene.bind()
  aspectRatio.bind()

  if (!testScene.value) return

  return (
    <div className="absolute z-1 whFull">
      <Header
        text="Test"
        {...opctions.reduce((old, value) => ({ ...old, [value]: () => (aspectRatio.value = value) }), {})}
        Start={test}
        Stop={() => {
          console.clear()
          testScene.value = ``
        }}
      />
      <div className="flex justifyContent bg-zinc-950 h100p">
        <iframe
          title="scene"
          className="brl1_c2"
          style={{ height: `min(100%, 100vw * ${aspectRatio.value})`, aspectRatio: aspectRatio.value }}
          srcDoc={testScene.value}
        />
      </div>
    </div>
  )
}
