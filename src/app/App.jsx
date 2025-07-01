import { createPortal } from "react-dom"
import Docs from "../docs/Docs"
import Hierarchy from "../hierarchy/Hierarchy"
import Inspector from "../inspector/Inspector"
import Files from "../files/Files"
import LoadData from "../ui/LoadData"
import ContextMenu from "../ui/ContextMenu"
import NameInput from "../ui/NameInput"
import DragData from "../ui/DragData"
import Test from "../ui/Test"

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
