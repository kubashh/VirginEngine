export default function FileElement({
  deep,
  name,
  arrowSignal,
  ChildsElement,
  ...props
}: FileElementProps) {
  const open = arrowSignal.use();
  return (
    <>
      <div className="flex" style={{ marginLeft: deep * 8 }}>
        {arrowSignal.component}
        <div className="cursor-pointer hover:text-zinc-400" {...props} children={name} />
      </div>
      {open ? <ChildsElement /> : null}
    </>
  );
}

type FileElementProps = {
  deep: number;
  name: string;
  ChildsElement: any;
  arrowSignal: any;
} & React.HTMLProps<HTMLDivElement>;
