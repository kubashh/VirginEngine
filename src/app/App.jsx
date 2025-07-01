import Docs from "../docs/Docs"
import Hierarchy from "../hierarchy/Hierarchy"
import Inspector from "../inspector/Inspector"
import Files from "../files/Files"
import LoadData from "../ui/LoadData"
import ContextMenu from "../ui/ContextMenu"
import NameInput from "../ui/NameInput"
import DragData from "../ui/DragData"
import Test from "../ui/Test"

export default function App() {
  return (
    <>
      <header>
        <LoadData />
        <ContextMenu />
        <NameInput />
        <DragData />
        <Test />
      </header>

      <main>
        <Docs />
        <Hierarchy />
        <Files />
        <Inspector />
      </main>
    </>
  )
}
