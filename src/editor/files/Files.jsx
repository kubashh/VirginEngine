import { Header } from "../Header"
import { File } from "./File"
const { editor } = window.data

export const Files = () => {
  return <div
    style={{
      backgroundColor: "black",
      gridColumn: "1 / span 1",
      gridRow: "2 / span 1",
      overflow: "scroll"
    }}
    onClick={() => {
      editor.selectedField = `files`
    }}
  >
    <Header
      text="Files"
    />
    <File />
  </div>
}