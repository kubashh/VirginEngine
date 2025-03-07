import { editor } from "./lib/consts"
import { useRefresh } from "./lib/hooks"
import { EditorWindow } from "./lib/components"
import { Scene } from "./editor/scene/Scene"
import { Hierarchy } from "./editor/hierarchy/Hierarchy"
import { Inspector } from "./editor/inspector/Inspector"
import { Files } from "./editor/files/Files"
import { UI } from "./editor/ui/UI"

export const App = () => {
  editor.reload = useRefresh()

  return (
    <>
      <EditorWindow text="Scene" content={<Scene />} />
      <EditorWindow text="Hierarchy" content={<Hierarchy />} />
      <EditorWindow text="Files" content={<Files />} />
      <EditorWindow text="Inspector" content={<Inspector />} />

      <UI />
    </>
  )
}
