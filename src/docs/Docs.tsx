import Window from "../components/Window"

function DocsContent() {
  return (
    <div className="p-0.75 overflow-y-scroll select-text">
      <a
        className="ml-2 hover:text-zinc-400"
        href="https://github.com/kubashh/virginengine?tab=readme-ov-file"
      >
        https://github.com/kubashh/virginengine?tab=readme-ov-file
      </a>
    </div>
  )
}

export default function Docs() {
  return (
    <Window name="Docs" className="row-span-2 w-(--w1) border-r-1 border-zinc-400">
      <DocsContent />
    </Window>
  )
}
