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
}) => (
  <>
    <div className="flex" style={{ marginLeft: deep * 10 }}>
      {arrow}
      <div
        className="hover pointer"
        {...{ onClick, onContextMenu, onMouseDown, onMouseUp, onDoubleClick }}
        children={name}
      />
    </div>
    {childsElement}
  </>
)

export const Header = ({ text, ...rest }) => (
  <div className="Header">
    <h3 children={text} />
    {Object.entries(rest).map(([key, value]) => (
      <input
        type="button"
        className="hover"
        key={key}
        value={key}
        onClick={value}
      />
    ))}
  </div>
)
