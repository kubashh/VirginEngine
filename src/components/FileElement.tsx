import { contextMenuSignal, dragDataSignal, inspectorSignal } from "../lib/consts";
import InspectorDisplay from "../files/InspectorDisplay";
import { setComponents } from "../hierarchy/components/componentsLib";

export default function FileElement({
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
            if (!isMain)
              dragDataSignal.set({ from: isHierarchy ? `hierarchy` : `files`, parent, file, name });
          }}
          onClick={() => {
            isHierarchy && !isMain
              ? setComponents({ parent, object: file, name })
              : inspectorSignal.set(<InspectorDisplay path={path} file={file} name={name} />);
          }}
          onContextMenu={({ pageX, pageY }) => {
            contextMenuSignal.set({
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
  parent: TObj<any>;
  ChildsElement: any;
  arrowSignal: any;
  contextMenuProps: TObj<Void | false>;
} & React.HTMLProps<HTMLDivElement>;
