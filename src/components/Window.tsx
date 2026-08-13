import { clsx } from "wdwh";
import { Button } from "wdwh/components";

export default function Window({ name, id, headerOptions, className, style, children }: WindowProps) {
  return (
    <section id={id} className={clsx(`grid grid-rows-[24px_1fr]`, className)} style={style}>
      <Header name={name} options={headerOptions} />
      {children}
    </section>
  );
}

function Header({ name, options }: HeaderProps) {
  return (
    <div className="border-b border-zinc-400 px-2 flex bg-black">
      <span className="mr-auto font-bold">{name}</span>
      {options ? (
        <div className="flex *:mx-2">
          {Object.keys(options).map((name) => (
            <HeaderOption key={name} label={name} value={options[name]} />
          ))}
        </div>
      ) : null}
    </div>
  );
}

function HeaderOption({ label, value }: { label: string; value: any }) {
  return typeof value === `object` ? (
    <HeaderOptionDropdown label={label}>
      {Object.keys(value).map((key) => (
        <HeaderOption key={key} label={key} value={value[key]} />
      ))}
    </HeaderOptionDropdown>
  ) : (
    <Button className="my-auto hover:text-zinc-400" label={label} onClick={value} />
  );
}

function HeaderOptionDropdown({ label, children }: HeaderOptionsHelperProps) {
  return (
    <div className="relative flex flex-col group">
      <Button className="hover:text-zinc-400">{label}</Button>

      <div className="absolute mt-6 right-0 flex-col hidden group-hover:flex">{children}</div>
    </div>
  );
}

type WindowProps = {
  name: string;
  id?: string;
  headerOptions?: TObj<TObj<Void> | Void>;
  headerOptionsLabel?: string;
  className?: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
};

type HeaderProps = {
  name: string;
  options?: TObj<TObj<Void> | Void>;
};

type HeaderOptionsHelperProps = {
  label: string;
  children: React.ReactNode;
};
