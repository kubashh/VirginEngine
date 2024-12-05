import { editor } from "../data"
import { Files } from "./Files"
import { Hierarchy } from "./Hierarchy"
import { Inspector } from "./Inspector"
import { UI } from "./UI"

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