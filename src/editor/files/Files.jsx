import File from "./File"
import { editor, files } from "../../lib/consts"
import { useRefresh } from "../../lib/hooks"
import { Header } from "../../lib/components"

const FilesComponent = () => {
  editor.reloadFiles = useRefresh()

  return <File file={files} name="files" main />
}

export default function Files() {
  return (
    <section className="files">
      <Header text="Files" />
      <div>
        <FilesComponent />
      </div>
    </section>
  )
}
