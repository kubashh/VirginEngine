import File from "./File"
import Header from "../components/Header"
import { editor, files } from "../lib/consts"
import { useRefresh } from "../lib/hooks"

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
