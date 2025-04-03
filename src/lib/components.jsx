export const FileElement = ({ deep, arrow, name, childsElement, ...rest }) => (
  <>
    <div className="flex fadeIn" style={{ marginLeft: deep * 8 }}>
      {arrow}
      <div className="hover" {...rest} children={name} />
    </div>
    {childsElement}
  </>
)

export const Header = ({ text, ...rest }) => (
  <div className="flex bb1_aaa pr8 pl8">
    <h3 className="mr_auto" children={text} />
    {Object.keys(rest).map((key) => (
      <input
        type="button"
        className="mt_auto mr8 mb_auto ml8 hover"
        key={key}
        value={key}
        onClick={rest[key]}
      />
    ))}
  </div>
)
