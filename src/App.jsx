import { editor } from "./lib/consts"
import { useRefresh } from "./lib/hooks"
import { Scene } from "./editor/scene/Scene"
import { Hierarchy } from "./editor/hierarchy/Hierarchy"
import { Inspector } from "./editor/inspector/Inspector"
import { Files } from "./editor/files/Files"
import { LoadData } from "./editor/ui/LoadData"
import { ContextMenu } from "./editor/ui/ContextMenu"
import { NameInput } from "./editor/ui/NameInput"
import { DragData } from "./editor/ui/DragData"
import { createPortal } from "react-dom"
import { Test } from "./editor/ui/Test"

const Dynamic = () => {
  const reload = useRefresh()
  editor.reloadApp = () => {
    editor.reloadLoadData()
    reload()
  }

  return (
    <>
      <Scene />
      <Hierarchy />
      <Files />
      <Inspector />
    </>
  )
}

const Static = () => (
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
    {createPortal(<Static />, document.getElementsByTagName(`header`)[0])}
    <Dynamic />
  </>
)
