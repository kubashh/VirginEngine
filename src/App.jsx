import { Docs } from "./editor/docs/Docs"
import { Hierarchy } from "./editor/hierarchy/Hierarchy"
import { Inspector } from "./editor/inspector/Inspector"
import { Files } from "./editor/files/Files"
import { LoadData } from "./editor/ui/LoadData"
import { ContextMenu } from "./editor/ui/ContextMenu"
import { NameInput } from "./editor/ui/NameInput"
import { DragData } from "./editor/ui/DragData"
import { createPortal } from "react-dom"
import { Test } from "./editor/ui/Test"

const StaticUI = () => (
  <>
    <LoadData />
    <ContextMenu />
    <NameInput />
    <DragData />
    <Test />
  </>
)

export const App = () => (
  <>
    {createPortal(<StaticUI />, document.getElementsByTagName(`header`)[0])}

    <Docs />
    <Hierarchy />
    <Files />
    <Inspector />
  </>
)
