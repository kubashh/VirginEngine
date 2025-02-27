import { EditorWindow } from "./EditorWindow"
import { Files } from "./files/Files"
import { Hierarchy } from "./hierarchy/Hierarchy"
import { Inspector } from "./inspector/Inspector"
import { Scene } from "./scene/Scene"
import { UI } from "./ui/UI"

export const Editor = () => {
  const { width, height } = window.editor

  const width1 = Math.floor(width * 0.15 + 50)
  const width2 = Math.floor(width * 0.2 + 50)
  const width0 = width - width1 - width2

  const height0 = Math.floor(height * 0.55)
  const height1 = height - height0

  return (
    <>
      <UI />
      <div
        style={{
          display: `grid`,
          gridTemplateColumns: `${width0}px ${width1}px auto`,
          gridTemplateRows: `55vh auto`,
          gap: 1,
          backgroundColor: `#aaa`,
          width,
          height
        }}
      >
        <EditorWindow
          text="Scene"
          position={{
            b: 2,
            x: 1,
            y: 1
          }}
          style={{
            width: width0,
            height
          }}
          content={<Scene width={width0} />}
        />
        <EditorWindow
          text="Hierarchy"
          position={{
            x: 2,
            y: 1
          }}
          style={{
            width: width1,
            height: height0
          }}
          content={<Hierarchy />}
        />
        <EditorWindow
          text="Inspector"
          position={{
            b: 2,
            x: 3,
            y: 1
          }}
          style={{
            width: width2,
            height
          }}
          content={<Inspector />}
        />
        <EditorWindow
          text="Files"
          position={{
            x: 2,
            y: 2
          }}
          style={{
            width: width1,
            height: height1
          }}
          content={<Files />}
        />
      </div>
    </>
  )
}
