import { File } from "./File"
import { editor, files } from "../../lib/consts"
import { useRefresh } from "../../lib/hooks"

export const Files = () => {
  const refresh = useRefresh()

  editor.reloadFiles = refresh

  return (
    <div style={{ overflow: `scroll`, userSelect: `none` }}>
      <File file={files} name="files" main />
    </div>
  )
}
