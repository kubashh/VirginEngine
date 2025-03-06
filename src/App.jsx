import { LoadData } from "./loadData/LoadData"
import { editor } from "./lib/consts"
import { useRefresh } from "./lib/hooks"
import { EditorWindow } from "./editor/EditorWindow"
import { Scene } from "./editor/scene/Scene"
import { Hierarchy } from "./editor/hierarchy/Hierarchy"
import { Inspector } from "./editor/inspector/Inspector"
import { Files } from "./editor/files/Files"
import { UI } from "./editor/ui/UI"

export const App = () => {
  editor.reload = useRefresh()

  // TODO width height na static string

  const { width, height } = editor

  const width1 = Math.floor(width * 0.15 + 50)
  const width2 = Math.floor(width * 0.2 + 50)
  const width0 = width - width1 - width2

  const height0 = Math.floor(height * 0.55)
  const height1 = height - height0

  return (
    <>
      <EditorWindow
        text="Scene"
        position={{ b: 2, x: 1, y: 1 }}
        style={{ width: width0, height }}
        content={<Scene width={width0} />}
      />
      <EditorWindow
        text="Hierarchy"
        position={{ x: 2, y: 1 }}
        style={{ width: width1, height: height0 }}
        content={<Hierarchy />}
      />
      <EditorWindow
        text="Inspector"
        position={{ b: 2, x: 3, y: 1 }}
        style={{ width: width2, height }}
        content={<Inspector />}
      />
      <EditorWindow
        text="Files"
        position={{ x: 2, y: 2 }}
        style={{ width: width1, height: height1 }}
        content={<Files />}
      />

      <LoadData />
      <UI />
    </>
  )
}
