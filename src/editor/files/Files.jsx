import { File } from "./File"
import { editor, files } from "../../lib/consts"
import { useRefresh } from "../../lib/hooks"
import { Header } from "../../lib/components"

const FilesComponent = () => {
  editor.reloadFiles = useRefresh()

  return (
    <div className="scroll">
      <File file={files} name="files" main />
    </div>
  )
}

export const Files = () => (
  <section id="files">
    <Header text="Files" />
    <FilesComponent />
  </section>
)
