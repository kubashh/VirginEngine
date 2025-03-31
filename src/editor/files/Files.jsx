import { File } from "./File"
import { editor, files } from "../../lib/consts"
import { useRefresh } from "../../lib/hooks"
import { Header } from "../../lib/components"

const FilesComponent = () => {
  editor.reloadFiles = useRefresh()

  return (
    <div>
      <File file={files} name="files" main />
    </div>
  )
}

export const Files = () => (
  <section className="files">
    <Header text="Files" />
    <FilesComponent />
  </section>
)
