import { editor } from "../lib/consts"
import { loadFile, openMainScene } from "../lib/utils"
import { useRefresh } from "../lib/hooks"

function LoadDataButton(props: { value: string; onClick: React.MouseEventHandler }) {
  return <input className="m30_auto p20_92 b_c2 fontSize52 hover" type="button" {...props} />
}

export default function LoadData() {
  const refresh = useRefresh()

  return !editor.setUp ? (
    <div className="absolute z-1 whFull bgc000_50p flex flex-col justifyContent">
      <LoadDataButton value="Load Project" onClick={() => loadFile(refresh)} />
      <LoadDataButton
        value="New project"
        onClick={() => {
          openMainScene()
          refresh()
        }}
      />
    </div>
  ) : null
}
