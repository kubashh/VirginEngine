import { createPortal } from "react-dom"
import Docs from "./editor/docs/Docs"
import Hierarchy from "./editor/hierarchy/Hierarchy"
import Inspector from "./editor/inspector/Inspector"
import Files from "./editor/files/Files"
import LoadData from "./editor/ui/LoadData"
import ContextMenu from "./editor/ui/ContextMenu"
import NameInput from "./editor/ui/NameInput"
import DragData from "./editor/ui/DragData"
import Test from "./editor/ui/Test"

function StaticUI() {
  return (
    <>
      <LoadData />
      <ContextMenu />
      <NameInput />
      <DragData />
      <Test />
    </>
  )
}

export default function App() {
  return (
    <>
      {createPortal(<StaticUI />, document.getElementsByTagName(`header`)[0])}

      <Docs />
      <Hierarchy />
      <Files />
      <Inspector />
    </>
  )
}
