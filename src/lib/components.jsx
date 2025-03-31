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
        className="hover"
        {...{ onClick, onContextMenu, onMouseDown, onMouseUp, onDoubleClick }}
        children={name}
      />
    </div>
    {childsElement}
  </>
)

export const Header = ({ text, ...rest }) => (
  <div className="flex bb1_aaa pr8 pl8">
    <h3 className="mr_auto" children={text} />
    {Object.entries(rest).map(([key, value]) => (
      <input
        type="button"
        className="mt_auto mr8 mb_auto ml8 hover"
        key={key}
        value={key}
        onClick={value}
      />
    ))}
  </div>
)
