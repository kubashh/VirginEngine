import { useState } from "react"
import { editor } from "../../lib/consts"
import { Header } from "../../lib/components"
import { test } from "../../build/build"

const defaultCode = `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width,initial-scale=1.0">
    <title>Hello</title>
  </head>
  <body style="background-color:black; color: gray; user-select:none; display:flex; justify-content:center;">
    <h1 style="margin-top:35vh">Empty</h1>
  </body>
</html>`

const opctions = [`16 / 9`, `1 / 1`, `9 / 16`]

export const Test = () => {
  const [aspectRatio, setAspectRatio] = useState(opctions[0])
  const [code, setCode] = useState()
  editor.setScene = setCode

  return (
    <div className={`fullwh zIndex2 ${code ? `absolute` : `none`}`}>
      <Header
        text="Text"
        {...opctions.reduce(
          (old, value) => ({ ...old, [value]: () => setAspectRatio(value) }),
          {}
        )}
        Start={test}
        Stop={() => {
          console.clear()
          setCode()
        }}
      />
      <div
        className="flex"
        style={{
          height: `100%`,
          justifyContent: `center`,
          backgroundColor: `#111`
        }}
      >
        <iframe
          title="scene"
          style={{
            height: `min(100%, 100vw * ${aspectRatio})`,
            border: `1px solid gray`,
            borderLeft: `1px solid gray`,
            aspectRatio
          }}
          srcDoc={code || defaultCode}
        />
      </div>
    </div>
  )
}
