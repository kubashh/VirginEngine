import { Files } from "./files/Files"
import { Hierarchy } from "./hierarchy/Hierarchy"
import { Inspector } from "./inspector/Inspector"
import { UI } from "./UI"

export const Editor = () => {
  const { editor } = window.data

  return <>
    <UI />
    <div
      style={{
        width: editor.width,
        height: editor.height,
        display: "grid",
        gridTemplateColumns: "320px auto",
        gridTemplateRows: "55vh auto",
        gap: 1,
        backgroundColor: "#aaa"
      }}
    >
      <Hierarchy />
      <Inspector />
      <Files />
    </div>
  </>
}