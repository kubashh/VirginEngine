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
  <div
    className="flex"
    style={{ borderBottom: `1px solid #aaa`, padding: `0 8px` }}
  >
    <h3 children={text} />
    <div
      className="flex"
      style={{ marginLeft: `auto` }}
      children={Object.entries(rest).map(([key, value]) => (
        <input
          type="button"
          className="hover"
          style={{
            margin: `auto 8px`,
            backgroundColor: `black`,
            fontSize: 16
          }}
          key={key}
          value={key}
          onClick={value}
        />
      ))}
    />
  </div>
)
