import { useState } from "react"
import { SceneDropdown } from "./SceneDropdown"
import { Header } from "../../lib/components"

export const Scene = () => {
  const [aspectRatio, setAspectRatio] = useState(`16 / 9`)

  return (
    <>
      <Header
        text="Scene"
        elements={
          <SceneDropdown
            currentText={aspectRatio}
            setAspectRatio={setAspectRatio}
          />
        }
      />
      <div style={{ backgroundColor: `#111` }}>
        <canvas style={{ width: `100%`, aspectRatio }} />
      </div>
    </>
  )
}
