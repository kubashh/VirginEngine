import { useState } from "react"
import { DropdownMenu } from "./DropdownMenu"

export const Scene = ({ width }) => {
  const [aspectRatio, setAspectRatio] = useState(`16 / 9`)

  return (
    <div
      style={{
        backgroundColor: `#111`
      }}
    >
      <DropdownMenu
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
