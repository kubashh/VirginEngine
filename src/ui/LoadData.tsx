import { setUpSignal } from "../lib/consts";
import { loadProject, openMainScene } from "../lib/util";

// It is called once, so no extra optymalization needed
export default function LoadData() {
  const setUp = setUpSignal.use();

  return !setUp ? (
    <div className="absolute z-1 w-screen h-screen flex flex-col justify-center bg-[#000a]">
      <LoadDataButton value="Load Project" onClick={loadProject} />
      <LoadDataButton value="New project" onClick={openMainScene} />
    </div>
  ) : null;
}

function LoadDataButton(props: { value: string; onClick: React.MouseEventHandler }) {
  return (
    <input
      className="mx-auto my-6 border-4 border-zinc-400 px-16 py-4 text-5xl hover:text-zinc-400 cursor-pointer"
      type="button"
      {...props}
    />
  );
}
