export default function Header({ name, options }: HeaderProps) {
  return (
    <div className="border-b-1 border-zinc-400 px-2 flex bg-black">
      <span className="mr-auto font-bold">{name}</span>
      {options &&
        Object.keys(options).map((key) => (
          <input
            type="button"
            className="my-auto mx-2 cursor-pointer hover"
            key={key}
            value={key}
            onClick={options[key]}
          />
        ))}
    </div>
  )
}
