import Window from "../components/Window";

export default function Docs() {
  return (
    <Window
      name="Docs"
      id="docs"
      className="w-screen h-screen"
      style={{ display: `none` }}
      headerOptions={{ Exit: hideDocs }}
    >
      <div className="flex justify-center bg-zinc-950">
        <DocsContent />
      </div>
    </Window>
  );
}

function DocsContent() {
  return (
    <div className="h-auto px-2 py-1 select-text scroll-auto">
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

export function showDocs() {
  const docsElement = document.getElementById(`docs`);
  if (docsElement) docsElement.style.display = ``;
}

function hideDocs() {
  const docsElement = document.getElementById(`docs`);
  if (docsElement) docsElement.style.display = `none`;
}
