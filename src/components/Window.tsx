import clsx from "clsx"

export default function Window({ name, headerOptions, className, children }: WindowProps) {
  return (
    <section className={clsx(`grid grid-rows-[24px_1fr]`, className)}>
      <Header name={name} options={headerOptions} />
      {children}
    </section>
  )
}

function Header({ name, options }: HeaderProps) {
  return (
    <div className="border-b border-zinc-400 px-2 flex bg-black">
      <span className="mr-auto font-bold">{name}</span>
      {options &&
        Object.keys(options).map((key) => (
          <input
            type="button"
            className="my-auto mx-2 cursor-pointer hover:text-zinc-400"
            key={key}
            value={key}
            onClick={options[key]}
          />
        ))}
    </div>
  )
}
