import { Header } from "./Header"
const { editor } = window.data

export const Files = () => {
  return <div
    style={{
      backgroundColor: "black",
      gridColumn: "1 / span 1",
      gridRow: "1 / span 1"
    }}
    onClick={() => {
      editor.selectedField = `files`
    }}
  >
    <Header
      text="Files"
    />
  </div>
}