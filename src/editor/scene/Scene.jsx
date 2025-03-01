import { useState } from "react"
import { SceneDropdown } from "./SceneDropdown"

export const Scene = ({ width }) => {
  const [aspectRatio, setAspectRatio] = useState(`16 / 9`)

  return (
    <div style={{ backgroundColor: `#111` }}>
      <SceneDropdown
        currentText={aspectRatio}
        setAspectRatio={setAspectRatio}
        left={width}
      />
      <canvas
        style={{
          width: `100%`,
          aspectRatio
        }}
      />
    </div>
  )
}
