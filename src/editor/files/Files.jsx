import { useEffect, useState } from "react"
import { File } from "./File"
import { editor, files } from "../../lib/consts"

export const Files = () => {
  const [state, setState] = useState(0)

  useEffect(() => {
    editor.reloadFiles = () => {
      setState(state + 1)
    }
  })

  return (
    <div style={{ overflow: `scroll`, userSelect: `none` }}>
      <File file={files} name="files" main />
    </div>
  )
}
