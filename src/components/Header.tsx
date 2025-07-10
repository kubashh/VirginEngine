export default function Header({ text, ...rest }: Obj) {
  return (
    <div className="border-b-1 border-solid border-zinc-400 px-2 flex">
      <span className="mr-auto font-bold">{text}</span>
      {Object.keys(rest).map((key) => (
        <input
          type="button"
          className="my-auto mx-2 cursor-pointer hover"
          key={key}
          value={key}
          onClick={rest[key]}
        />
      ))}
    </div>
  )
}
