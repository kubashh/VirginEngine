import { Editor } from "./editor/Editor"
import { LoadData } from "./loadData/LoadData"
import { editor } from "./lib/consts"
import { useRefresh } from "./lib/hooks"

export const App = () => {
  const refresh = useRefresh()

  editor.reload = refresh

  return (
    <>
      {!editor.setUp && <LoadData />}
      <Editor />
    </>
  )
}
