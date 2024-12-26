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

  const onClick = () => {
    window.editor.setNameInput([``, (newText) => {
      if(!window.editor.isValidName(newText)) {
        return
      }

      window.files[newText] = {
        type: `folder`
      }

      reloadFiles()
    }])
  }

  return <div
    style={{
      overflow: `scroll`,
      userSelect: `none`
    }}
  >
    <File
      file={window.files}
      main={true}
    />
    <div
      style={{
        cursor: `pointer`
      }}
      onClick={onClick}
    >
      + Add New Folder
    </div>
  </div>
}