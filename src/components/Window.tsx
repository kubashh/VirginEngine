import { clsx } from "wdwh";
import Button from "./Button";

export default function Window({ name, headerOptions, className, children }: WindowProps) {
  return (
    <section className={clsx(`grid grid-rows-[24px_1fr]`, className)}>
      <Header name={name} options={headerOptions} />
      {children}
    </section>
  );
}

function Header({ name, options }: HeaderProps) {
  return (
    <div className="border-b border-zinc-400 px-2 flex bg-black">
      <span className="mr-auto font-bold">{name}</span>
      {options &&
        Object.keys(options).map((key) => (
          <Button
            key={key}
            label={key}
            className="my-auto mx-2 hover:text-zinc-400"
            onClick={options[key]}
          />
        ))}
    </div>
  );
}
