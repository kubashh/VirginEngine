import { useEffect, useState } from "react"
import { editor } from "./data"
import { Editor } from "./routes/Editor"
import { LoadData } from "./routes/loadData/LoadData"

export const App = () => {
  const [state, setState] = useState(0)

  useEffect(() => {
    editor.reload = () => {
      setState(state + 1)
    }
  })

  return (
    <div>
      {!editor.setUp ? <LoadData /> : <></>}
      <Editor />
    </div>
  )
}