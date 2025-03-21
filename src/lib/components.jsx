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
  const element = (
    <div
      className="hover pointer"
      onClick={onClick}
      onContextMenu={onContextMenu}
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
      onDoubleClick={onDoubleClick}
      children={name}
    />
  )

  return (
    <>
      <div className="flex" style={{ marginLeft: deep * 10 }}>
        {arrow}
        {element}
      </div>
      {childsElement}
    </>
  )
}

export const Header = ({ text, children }) => (
  <div
    className="flex"
    style={{ borderBottom: `1px solid #aaa`, padding: `0 8px` }}
  >
    <h3 children={text} />
    <div className="flex" style={{ marginLeft: `auto` }} children={children} />
  </div>
)

export const Dropdown = ({ text, rest, style }) => {
  return (
    <div
      className="hoverShow flexColumn"
      style={{ zIndex: 1, width: 80, ...style }}
    >
      <input type="button" value={text} />
      {rest.map(([label, onClick]) => (
        <input
          type="button"
          className="content"
          style={{ width: 150 }}
          key={label}
          value={label}
          onClick={onClick}
        />
      ))}
    </div>
  )
}

/*const Dropdown = ({ text, children }) => {
  return (
    <>
      <div className="dropdown">
        <button>{text}</button>
        <div className="content" children={children} />
      </div>
    </>
  )
}

const TestDropDown = () => {
  return (
    <Dropdown text="Click">
      <div>content 1</div>
      <div>content 2</div>
      <div>content 3</div>
    </Dropdown>
  )
}*/
