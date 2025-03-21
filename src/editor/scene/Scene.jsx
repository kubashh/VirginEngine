import { useState } from "react"
import { Header } from "../../lib/components"
import { editor } from "../../lib/consts"
import { test } from "../../build/build"

const defaultCode = `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width,initial-scale=1.0">

    <title>Hello</title>
  </head>
  <body style="
    background-color:black;
    color: gray;
    user-select:none;
    display:flex;
    justify-content:center;">

    <h1 style="margin-top:35vh">Empty</h1>
  </body>
</html>`

const opctions = [`16 / 9`, `9 / 16`]

const SceneComponent = ({ aspectRatio }) => {
  const [code, setCode] = useState()
  editor.setScene = setCode

  return (
    <div className="scroll">
      <iframe
        title="scene"
        style={{
          width: `calc(100% - 4px)`,
          border: `2px solid #222`,
          aspectRatio
        }}
        srcDoc={code || defaultCode}
      />
    </div>
  )
}

export const Scene = () => {
  const [aspectRatio, setAspectRatio] = useState(opctions[0])

  return (
    <div id="scene">
      <Header
        text="Scene"
        Start={test}
        Stop={() => editor.setScene(``)}
        {...{
          [aspectRatio]: opctions.map((value) => [
            value,
            () => setAspectRatio(value)
          ])
        }}
      />
      <SceneComponent aspectRatio={aspectRatio} />
    </div>
  )
}
