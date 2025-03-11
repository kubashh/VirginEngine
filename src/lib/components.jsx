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
    <div
      style={{ display: `flex`, margin: `0 0 0 auto` }}
      children={elements}
    />
  </div>
)

export const Dropdown = (text, rest) => {
  const [isHover, hover] = useHover()

  return (
    <div
      style={{ zIndex: 1, display: `flex`, flexDirection: `column`, width: 80 }}
      {...hover}
    >
      <input type="button" value={text} />
      {isHover
        ? rest.map(([label, onClick]) => (
            <input
              type="button"
              style={{ width: 150 }}
              key={label}
              value={label}
              onClick={onClick}
            />
          ))
        : null}
    </div>
  )
}
