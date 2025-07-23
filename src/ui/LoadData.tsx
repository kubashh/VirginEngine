import { setUp } from "../lib/consts"
import { loadFile, openMainScene } from "../lib/utils"

function LoadDataButton(props: { value: string; onClick: React.MouseEventHandler }) {
  return (
    <input
      className="mx-auto my-6 border-4 border-zinc-400 px-16 py-4 text-5xl cursor-pointer hover"
      type="button"
      {...props}
    />
  )
}

export default function LoadData() {
  setUp.bind()

  return !setUp.value ? (
    <div className="absolute z-1 w-screen h-screen flex flex-col justify-center bg-[#000a]">
      <LoadDataButton value="Load Project" onClick={() => loadFile()} />
      <LoadDataButton value="New project" onClick={openMainScene} />
    </div>
  ) : null
}
