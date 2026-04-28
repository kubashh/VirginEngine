import Docs from "../docs/Docs";
import Hierarchy from "../hierarchy/Hierarchy";
import Inspector from "../inspector/Inspector";
import Files from "../files/Files";
import LoadData from "../ui/LoadData";
import ContextMenu from "../ui/ContextMenu";
import PopupMenu from "../ui/PopupMenu";
import NameInput from "../ui/NameInput";
import DragData from "../ui/DragData";
import Test from "../ui/Test";

export default function App() {
  return (
    <>
      <header className="*:absolute *:z-1">
        <LoadData />
        <ContextMenu />
        <PopupMenu />
        <NameInput />
        <DragData />
        <Test />
      </header>

      <main className="w-screen h-screen grid grid-cols-[30fr_30fr_40fr] grid-rows-[55fr_45fr]">
        <Docs />
        <Hierarchy />
        <Inspector />
        <Files />
      </main>
    </>
  );
}
