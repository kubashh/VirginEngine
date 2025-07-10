import { setUp } from "../lib/consts"
import { loadFile, openMainScene } from "../lib/utils"

function LoadDataButton(props: { value: string; onClick: React.MouseEventHandler }) {
  return <input className="m30_auto p20_92 b_c2 fontSize52 hover" type="button" {...props} />
}

export default function LoadData() {
  setUp.bind()

  return !setUp.value ? (
    <div className="absolute z-1 whFull bg-[#0007] flex flex-col justifyContent">
      <LoadDataButton value="Load Project" onClick={() => loadFile()} />
      <LoadDataButton value="New project" onClick={openMainScene} />
    </div>
  ) : null
}
