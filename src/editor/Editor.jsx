import { EditorWindow } from "./EditorWindow"
import { Files } from "./files/Files"
import { Hierarchy } from "./hierarchy/Hierarchy"
import { Inspector } from "./inspector/Inspector"
import { UI } from "./ui/UI"

export const Editor = () => {
  const { width, height } = window.data.editor

  const width0 = 320
  const width1 = width - width0

  const height0 = Math.floor(height * 0.55)
  const height1 = height - height0

  return <>
    <UI />
    <div
      style={{
        width,
        height,
        display: "grid",
        gridTemplateColumns: `${width0}px auto`,
        gridTemplateRows: "55vh auto",
        gap: 1,
        backgroundColor: "#aaa"
      }}
    >
      <EditorWindow
        text="Hierarchy"
        position={{
          x: 1,
          y: 1
        }}
        style={{
          width: width0,
          height: height0
        }}
        content={<Hierarchy />}
      />
      <EditorWindow
        text="Inspector"
        position={{
          b: 2,
          x: 2,
          y: 1
        }}
        style={{
          width: width1,
          height
        }}
        content={<Inspector />}
      />
      <EditorWindow
        text="Files"
        position={{
          x: 1,
          y: 2
        }}
        style={{
          width: width0,
          height: height1
        }}
        content={<Files />}
      />
    </div>
  </>
}