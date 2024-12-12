import { EditorWindow } from "../EditorWindow"
import { File } from "./File"

export const Files = () => {
  const { files } = window.data

  return <EditorWindow
  text="Files"
  position={{
    x: 1,
    y: 2
  }}
  content={<div
    style={{
      overflow: "scroll"
    }}
  >
    <File
      file={files}
    />
  </div>}
/>
}