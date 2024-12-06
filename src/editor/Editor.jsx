import { Files } from "./files/Files"
import { Hierarchy } from "./hierarchy/Hierarchy"
import { Inspector } from "./inspector/Inspector"
import { UI } from "./UI"
const { editor } = window.data

export const Editor = () => {
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