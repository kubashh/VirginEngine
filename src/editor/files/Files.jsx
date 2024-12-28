import { useEffect, useState } from "react"
import { File } from "./File"

export const Files = () => {
  const [state, setState] = useState(0)

  useEffect(() => {
    window.editor.reloadFiles = () => {
      setState(state + 1)
    }
  })

  return <div
    style={{
      overflow: `scroll`,
      userSelect: `none`
    }}
  >
    <File
      file={window.files}
      name="files"
      main
    />
  </div>
}