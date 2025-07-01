export default function FileElement({ deep, arrow, name, childsElement, ...rest }) {
  return (
    <>
      <div className="flex fadeIn" style={{ marginLeft: deep * 8 }}>
        {arrow}
        <div className="hover" {...rest} children={name} />
      </div>
      {childsElement}
    </>
  )
}
