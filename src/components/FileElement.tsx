export default function FileElement({ deep, arrow, name, childsElement, ...rest }: Any) {
  return (
    <>
      <div className="flex" style={{ marginLeft: deep * 8 }}>
        {arrow}
        <div className="cursor-pointer hover:text-zinc-400" {...rest} children={name} />
      </div>
      {childsElement}
    </>
  );
}
