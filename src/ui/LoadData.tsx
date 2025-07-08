import { editor } from "../lib/consts"
import { loadFile, openMainScene } from "../lib/utils"
import { useRefresh } from "../lib/hooks"

const newProject = (refresh: Void) => () => {
  openMainScene()
  refresh()
}

function LoadDataButton({ text, onClick }: { text: string; onClick: React.MouseEventHandler }) {
  return (
    <input className="m30_auto p20_92 b_c2 fontSize52 hover" type="button" value={text} onClick={onClick} />
  )
}

export default function LoadData() {
  const refresh = useRefresh()

  return !editor.setUp ? (
    <div className="absolute z-1 whFull bgc000_50p flex flex-col justifyContent">
      <LoadDataButton text="Load Project" onClick={() => loadFile(refresh)} />
      <LoadDataButton text="New project" onClick={newProject(refresh)} />
    </div>
  ) : null
}
