import { editor } from "./consts"
import { useHover } from "./hooks"

export const FileElement = ({
  deep,
  arrow,
  onClick,
  onContextMenu,
  onMouseDown,
  onMouseUp,
  onDoubleClick,
  name,
  childsElement
}) => {
  const [isHover, hover] = useHover()

  const element = (
    <div
      {...hover}
      style={{ cursor: `pointer`, color: !isHover ? `white` : `#555` }}
      onClick={onClick}
      onContextMenu={onContextMenu}
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
      onDoubleClick={onDoubleClick}
    >
      {name}
    </div>
  )

  return (
    <>
      <div
        style={{ marginLeft: deep * 10, display: `flex`, flexDirection: `row` }}
      >
        {arrow}
        {element}
      </div>
      {childsElement}
    </>
  )
}

export const Header = ({ text, elements }) => (
  <div className="header">
    <div children={text} />
    {elements}
  </div>
)

export const EditorWindow = ({ text, content }) => (
  <div
    className={text.toLowerCase()}
    onClick={() => (editor.selectedField = text)}
  >
    {content}
  </div>
)
