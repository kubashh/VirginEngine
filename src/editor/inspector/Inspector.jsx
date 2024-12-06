import { Header } from "../Header"
const { editor } = window.data

export const Inspector = () => {
  return <div
    style={{
      backgroundColor: "black",
      gridColumn: "2 / span 1",
      gridRow: "1 / span 2"
    }}
    onClick={() => {
      editor.selectedField = `inspector`
    }}
  >
    <Header
      text="Inspectior"
    />
  </div>
}