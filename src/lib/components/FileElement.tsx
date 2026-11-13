import { type ArrowSignal } from "../hooks";

export function FileElement({ deep, name, ChildsElement, arrowSignal, ...props }: FileElementProps) {
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
  ChildsElement: React.FC;
  arrowSignal: ArrowSignal;
} & React.HTMLProps<HTMLDivElement>;
