import { useState } from "react"
import { Dropdown, Header } from "../../lib/components"

const opctions = [`16 / 9`, `9 / 16`]

const SceneComponent = ({ aspectRatio }) => (
  <div style={{ backgroundColor: `#111` }}>
    <canvas style={{ width: `100%`, aspectRatio }} />
  </div>
)

export const Scene = () => {
  const [aspectRatio, setAspectRatio] = useState(opctions[0])

  return (
    <div className="scene">
      <Header
        text="Scene"
        elements={Dropdown(
          aspectRatio,
          opctions.map((value) => [value, () => setAspectRatio(value)])
        )}
      />
      <SceneComponent aspectRatio={aspectRatio} />
    </div>
  )
}
