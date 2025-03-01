import { Header } from "./Header"

export const EditorWindow = ({ style, text, content, position, elements }) => {
  return (
    <div
      style={{
        backgroundColor: `black`,
        gridColumn: `${position.x} / span ${position.a | 1}`,
        gridRow: `${position.y} / span ${position.b | 1}`,
        display: `grid`,
        gridTemplateRows: `24px auto`,
        overflow: `scroll`,
        ...style
      }}
      onClick={() => {
        window.editor.selectedField = text
      }}
    >
      <Header text={text} elements={elements} />
      {content}
    </div>
  )
}
