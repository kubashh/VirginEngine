import docs from "./docs.md";
import { Window } from "../components/Window";

export function Docs() {
  return (
    <Window
      name="Docs"
      id="docs"
      className="w-screen h-screen"
      style={{ display: `none` }}
      headerOptions={{ Exit: hideDocs }}
    >
      <div className="flex justify-center bg-zinc-950 scrollbar-y">
        <div
          className="px-2 py-2 select-text docs-content"
          dangerouslySetInnerHTML={{ __html: docs }}
        ></div>
      </div>
    </Window>
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
