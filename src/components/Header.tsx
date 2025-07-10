export default function Header({ text, ...rest }: Obj) {
  return (
    <div className="flex bb1_aaa border-zinc-500 border-20 px-2">
      <span className="mr-auto font-bold">text</span>
      {Object.keys(rest).map((key) => (
        <input type="button" className="my-auto mx-2 hover" key={key} value={key} onClick={rest[key]} />
      ))}
    </div>
  )
}
