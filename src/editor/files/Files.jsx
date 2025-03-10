import { File } from "./File"
import { editor, files } from "../../lib/consts"
import { useRefresh } from "../../lib/hooks"
import { Header } from "../../lib/components"

const FilesComponent = () => {
  editor.reloadFiles = useRefresh()

  return (
    <div style={{ overflow: `scroll`, userSelect: `none` }}>
      <File file={files} name="files" main />
    </div>
  )
}

export const Files = () => (
  <div className="files">
    <Header text="Files" />
    <FilesComponent />
  </div>
)
