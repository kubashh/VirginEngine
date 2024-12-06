import { Header } from "../Header"
const { editor } = window.data

export const Hierarchy = () => {
  return <div
    style={{
      backgroundColor: "black",
      gridColumn: "1 / span 1",
      gridRow: "1 / span 1"
    }}
    onClick={() => {
      editor.selectedField = `hierarchy`
    }}
  >
    <Header
      text="Hierarchy"
    />
  </div>
}