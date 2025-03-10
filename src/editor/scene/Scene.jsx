import { useState } from "react"
import { SceneDropdown } from "./SceneDropdown"
import { Header } from "../../lib/components"

const SceneComponent = ({ aspectRatio }) => (
  <div style={{ backgroundColor: `#111` }}>
    <canvas style={{ width: `100%`, aspectRatio }} />
  </div>
)

export const Scene = () => {
  const [aspectRatio, setAspectRatio] = useState(`16 / 9`)

  return (
    <div className="scene">
      <Header
        text="Scene"
        elements={
          <SceneDropdown
            currentText={aspectRatio}
            setAspectRatio={setAspectRatio}
          />
        }
      />
      <SceneComponent aspectRatio={aspectRatio} />
    </div>
  )
}
