import { inspectorSignal, type TFile } from "../lib/consts";
import { type ArrowSignal } from "../lib/hooks";
import { InspectorDisplay } from "../files/InspectorDisplay";
import { setContextMenu } from "../ui/ContextMenu";
import { setDragData } from "../ui/DragData";
import { setComponents } from "../hierarchy/components/componentsLib";

export function FileElement({
  deep,
  isHierarchy,
  name,
  path,
  file,
  parent,
  ChildsElement,
  arrowSignal,
  contextMenuProps,
  ...props
}: FileElementProps) {
  const isMain = deep === 0;
  const open = arrowSignal.use();

  return (
    <>
      <div className="flex" style={{ marginLeft: deep * 8 }}>
        {arrowSignal.component}
        <div
          className="cursor-pointer hover:text-zinc-400"
          onMouseDown={() => {
            if (!isMain) setDragData({ from: isHierarchy ? `hierarchy` : `files`, parent, file, name });
          }}
          onClick={() => {
            isHierarchy && !isMain
              ? setComponents({ parent, object: file, name })
              : inspectorSignal.set(<InspectorDisplay path={path} file={file} name={name} />);
          }}
          onContextMenu={({ pageX, pageY }) => {
            setContextMenu({
              x: pageX,
              y: pageY,
              ...contextMenuProps,
            });
          }}
          {...props}
          children={name}
        />
      </div>
      {open ? <ChildsElement /> : null}
    </>
  );
}

type FileElementProps = {
  deep: number;
  isHierarchy: boolean;
  name: string;
  path?: string;
  file: TFile;
  parent: TFile;
  ChildsElement: React.FC;
  arrowSignal: ArrowSignal;
  contextMenuProps: TObj<(() => void) | false>;
} & React.HTMLProps<HTMLDivElement>;
