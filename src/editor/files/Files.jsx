import { useEffect, useState } from "react"
import { File } from "./File"

export const Files = () => {
  const [state, setState] = useState(0)
  useEffect(() => {
    window.data.editor.reloadFiles = () => {
      setState(state + 1)
    }
  })

  return <div
    style={{
      overflow: "scroll"
    }}
  >
    <File
      file={window.data.files}
      main={true}
    />
  </div>
}