import { useEffect, useState } from "react"
import { File } from "./File"

export const Files = () => {
  const [state, setState] = useState(0)

  const reloadFiles = () => {
    setState(state + 1)
  }

  useEffect(() => {
    window.editor.reloadFiles = reloadFiles
  })

  return <div
    style={{
      overflow: `scroll`,
      userSelect: `none`
    }}
  >
    <File
      file={window.files}
      main={true}
      name="files"
    />
  </div>
}