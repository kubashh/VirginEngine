import File from "./File"
import Header from "../components/Header"
import { files } from "../lib/consts"

const FilesComponent = () => {
  files.bind()

  return <File file={files.value} name="files" deep={0} old />
}

export default function Files() {
  return (
    <section className="w-(--width2) h-(--height2) grid grid-rows-[24px_1fr]">
      <Header text="Files" />
      <div className="overflow-y-scroll">
        <FilesComponent />
      </div>
    </section>
  )
}
