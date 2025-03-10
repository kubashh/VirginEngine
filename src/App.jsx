import { editor } from "./lib/consts"
import { useRefresh } from "./lib/hooks"
import { Scene } from "./editor/scene/Scene"
import { Hierarchy } from "./editor/hierarchy/Hierarchy"
import { Inspector } from "./editor/inspector/Inspector"
import { Files } from "./editor/files/Files"
import { LoadData } from "./editor/ui/LoadData"
import { EditorOpctions } from "./editor/ui/EditorOpctions"
import { ContextMenu } from "./editor/ui/ContextMenu"
import { NameInput } from "./editor/ui/NameInput"
import { DragData } from "./editor/ui/DragData"

export const App = () => {
  editor.reloadApp = useRefresh()

  return (
    <>
      {/* Editor */}
      <Scene />
      <Hierarchy />
      <Files />
      <Inspector />

      {/* UI */}
      <LoadData />
      <EditorOpctions />
      <ContextMenu />
      <NameInput />
      <DragData />
    </>
  )
}
