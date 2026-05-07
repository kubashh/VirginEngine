import Window from "../components/Window";

export default function Docs() {
  return (
    <Window name="Docs" className="row-span-2 w-(--w1) border-r border-zinc-400">
      <DocsContent />
    </Window>
  );
}

function DocsContent() {
  return (
    <div className="px-2 py-1 scrollbar-y select-text">
      Visit:
      <a
        className="ml-2 hover:text-zinc-400"
        href="https://github.com/kubashh/VirginEngine?tab=readme-ov-file"
      >
        https://github.com/kubashh/VirginEngine?tab=readme-ov-file
      </a>
    </div>
  );
}
