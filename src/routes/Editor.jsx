import { editor } from "../data"
import { Files } from "./Files"
import { Hierarchy } from "./Hierarchy"
import { Inspector } from "./Inspector"

export const Editor = () => {
  return <div
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
}