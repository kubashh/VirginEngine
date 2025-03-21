import { useState } from "react"
import { Dropdown, Header } from "../../lib/components"

const opctions = [`16 / 9`, `9 / 16`]

const SceneComponent = ({ aspectRatio }) => (
  <div className="scroll">
    <canvas
      style={{
        width: `calc(100% - 4px)`,
        border: `2px solid #222`,
        aspectRatio
      }}
    />
  </div>
)

export const Scene = () => {
  const [aspectRatio, setAspectRatio] = useState(opctions[0])

  return (
    <div id="scene">
      <Header
        text="Scene"
        children={Dropdown(
          aspectRatio,
          opctions.map((value) => [value, () => setAspectRatio(value)])
        )}
      />
      <SceneComponent aspectRatio={aspectRatio} />
    </div>
  )
}
