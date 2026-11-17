export function Window({ name, id, headerOptions, className, style, children }: WindowProps) {
  return (
    <section
      id={id}
      className={`grid grid-rows-[24px_1fr]` + (className ? ` ` + className : ``)}
      style={style}
    >
      <Header name={name} options={headerOptions} />
      {children}
    </section>
  );
}

function Header({ name, options }: HeaderProps) {
  return (
    <div className="flex border-b border-zinc-400 bg-black px-2">
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

function HeaderOption({ label, value }: { label: string; value: TObj<() => void> | (() => void) }) {
  return typeof value === `object` ? (
    <HeaderOptionDropdown label={label}>
      {Object.keys(value).map((key) => (
        <HeaderOption key={key} label={key} value={value[key]} />
      ))}
    </HeaderOptionDropdown>
  ) : (
    <button className="my-auto hover:text-zinc-400" onClick={value}>
      {label}
    </button>
  );
}

function HeaderOptionDropdown({ label, children }: HeaderOptionsHelperProps) {
  return (
    <div className="group relative flex flex-col">
      <button className="hover:text-zinc-400">{label}</button>

      <div className="absolute right-0 mt-6 hidden flex-col group-hover:flex">{children}</div>
    </div>
  );
}

type WindowProps = {
  name: string;
  id?: string;
  headerOptions?: TObj<TObj<() => void> | (() => void)>;
  headerOptionsLabel?: string;
  className?: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
};

type HeaderProps = {
  name: string;
  options?: TObj<TObj<() => void> | (() => void)>;
};

type HeaderOptionsHelperProps = {
  label: string;
  children: React.ReactNode;
};
