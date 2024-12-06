import { useEffect, useState } from "react"
import { Editor } from "./editor/Editor"
import { LoadData } from "./loadData/LoadData"
const { editor } = window.data

export const App = () => {
  const [state, setState] = useState(0)

  useEffect(() => {
    editor.reload = () => {
      setState(state + 1)
    }
  })

  return <>
    {!editor.setUp ? <LoadData /> : <></>}
    <Editor />
  </>
}