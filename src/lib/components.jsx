export function FileElement({ deep, arrow, name, childsElement, ...rest }) {
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

export function Header({ text, ...rest }) {
  return (
    <div className="flex bb1_aaa border-zinc-500 border-20 px-2">
      <h3 className="mr-auto" children={text} />
      {Object.keys(rest).map((key) => (
        <input type="button" className="my-auto mx-2 hover" key={key} value={key} onClick={rest[key]} />
      ))}
    </div>
  )
}
