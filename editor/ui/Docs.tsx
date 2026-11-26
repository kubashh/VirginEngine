import docs from "../lib/assets/docs.md";
import { Window } from "../lib/components/Window";

export function Docs() {
  return (
    <Window
      name="Docs"
      id="docs"
      className="h-screen w-screen"
      style={{ display: `none` }}
      headerOptions={{ Exit: hideDocs }}
    >
      <div className="scrollbar-y flex justify-center bg-zinc-950">
        <div
          className="docs-content px-2 py-2 select-text"
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
