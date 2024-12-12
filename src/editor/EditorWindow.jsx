import { Header } from "./Header"

export const EditorWindow = ({ text, content, position }) => {
  const { editor } = window.data

  return <div
    style={{
      backgroundColor: "black",
      gridColumn: `${position.x} / span ${position.a | 1}`,
      gridRow: `${position.y} / span ${position.b | 1}`,
      display: "grid",
      gridTemplateRows: "24px auto"
    }}
    onClick={() => {
      editor.selectedField = text
    }}
  >
    <Header
      text={text}
    />
    <div
      style={{
        overflow: "scroll"
      }}
    >
      {content}
    </div>
  </div>
}