import { useState } from "react"
import { Dropdown, Header } from "../../lib/components"
import { editor } from "../../lib/consts"
import { htmlCode } from "../../build/htmlCode"

const opctions = [`16 / 9`, `9 / 16`]

const SceneComponent = ({ aspectRatio }) => {
  const [code, setCode] = useState(``)
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
        srcDoc={code}
      />
    </div>
  )
}

// TODO upgrade CustomButton
const CustomButton = ({ text, onClick }) => (
  <input
    type="button"
    style={{
      margin: `auto 12px`,
      backgroundColor: `black`
    }}
    value={text}
    onClick={onClick}
  />
)

export const Scene = () => {
  const [aspectRatio, setAspectRatio] = useState(opctions[0])

  return (
    <div id="scene">
      <Header
        text="Scene"
        children={
          <>
            <CustomButton
              text="Start"
              onClick={() => editor.setScene(htmlCode())}
            />
            <CustomButton text="Stop" onClick={() => editor.setScene(``)} />
            <Dropdown
              text={aspectRatio}
              rest={opctions.map((value) => [
                value,
                () => setAspectRatio(value)
              ])}
            />
          </>
        }
      />
      <SceneComponent aspectRatio={aspectRatio} />
    </div>
  )
}
