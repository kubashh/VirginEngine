import { File } from "./File"
import { editor, files } from "../../lib/consts"
import { useRefresh } from "../../lib/hooks"
import { Header } from "../../lib/components"

export const Files = () => {
  editor.reloadFiles = useRefresh()

  return (
    <>
      <Header text="Files" />
      <div style={{ overflow: `scroll`, userSelect: `none` }}>
        <File file={files} name="files" main />
      </div>
    </>
  )
}
