import { useEffect, useState } from "react"
import { Editor } from "./editor/Editor"
import { LoadData } from "./loadData/LoadData"

export const App = () => {
  const { editor } = window

  const [state, setState] = useState(0)

  useEffect(() => {
    editor.reload = () => {
      setState(state + 1)
    }
  })

  return (
    <>
      {!editor.setUp && <LoadData />}
      <Editor />
    </>
  )
}
