import { useEffect, useState } from "react"
import { Editor } from "./editor/Editor"
import { LoadData } from "./loadData/LoadData"
import { editor } from "./lib/consts"

export const App = () => {
  const [, setState] = useState(0)

  useEffect(() => {
    editor.reload = () => setState((prev) => prev + 1)
  })

  return (
    <>
      {!editor.setUp && <LoadData />}
      <Editor />
    </>
  )
}
