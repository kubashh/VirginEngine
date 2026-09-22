import { Window } from "../components/Window";
import { Hierarchy } from "../hierarchy/Hierarchy";
import { Inspector } from "../inspector/Inspector";
import { Files } from "../files/Files";
import { LoadData } from "../ui/LoadData";
import { ContextMenu } from "../ui/ContextMenu";
import { PopupMenu } from "../ui/PopupMenu";
import { NameInput } from "../ui/NameInput";
import { DragData } from "../ui/DragData";
import { Test } from "../ui/Test";
import { Docs } from "../docs/Docs";
import { Notifications } from "../ui/Notifications";

export function App() {
  return (
    <>
      <header className="*:absolute *:z-1">
        <LoadData />
        <ContextMenu />
        <PopupMenu />
        <NameInput />
        <DragData />
        <Test />
        <Docs />
        <Notifications />
      </header>

      <main className="w-screen h-screen grid grid-cols-[30fr_30fr_40fr] grid-rows-[55fr_45fr]">
        <Window name="" className="row-span-2 w-(--w1) border-r border-zinc-400">
          <div></div>
        </Window>
        <Hierarchy />
        <Inspector />
        <Files />
      </main>
    </>
  );
}
