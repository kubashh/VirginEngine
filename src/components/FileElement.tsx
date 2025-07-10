export default function FileElement({ deep, arrow, name, childsElement, ...rest }: Obj) {
  return (
    <>
      <div className="flex" style={{ marginLeft: deep * 8 }}>
        {arrow}
        <div className="cursor-pointer hover" {...rest} children={name} />
      </div>
      {childsElement}
    </>
  )
}
