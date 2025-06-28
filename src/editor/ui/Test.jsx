import { useState } from "react"
import { editor } from "../../lib/consts"
import { Header } from "../../lib/components"
import { test } from "../../build/build"

const opctions = [`16 / 9`, `1 / 1`, `9 / 16`]

export default function Test() {
  const [aspectRatio, setAspectRatio] = useState(opctions[0])
  const [code, setCode] = useState()
  editor.setScene = setCode

  if (!code) return

  return (
    <div className="zAbsolute whFull">
      <Header
        text="Test"
        {...opctions.reduce((old, value) => ({ ...old, [value]: () => setAspectRatio(value) }), {})}
        Start={test}
        Stop={() => {
          console.clear()
          setCode()
        }}
      />
      <div className="flex justifyContent bgc111 h100p">
        <iframe
          title="scene"
          className="brl1_c2"
          style={{ height: `min(100%, 100vw * ${aspectRatio})`, aspectRatio }}
          srcDoc={code}
        />
      </div>
    </div>
  )
}
