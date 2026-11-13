import { audioIconSrc, defaultAssets } from "../lib/assets/assets";
import { type TFile } from "../lib/consts";
import { useArrow } from "../lib/hooks";
import { isCapitalized, deepCopy } from "../lib/util";
import { FileElement } from "../lib/components/FileElement";
import { refreshHierarchy, setHierarchy } from "../hierarchy/Hierarchy";
import { refreshFiles } from "./Files";
import { InspectorDisplay } from "./InspectorDisplay";
import { setInspector } from "../inspector/Inspector";
import { getDragData, setDragData } from "../ui/DragData";
import { setNameInput } from "../ui/NameInput";
import { setContextMenu } from "../ui/ContextMenu";

export function File({ parent, file, name, deep, path = `files` }: FileProps) {
  const isMain = deep === 0;
  if (!isMain) path += `.${name}`;
  const isFolder = file.type === `folder`;
  const arrowSignal = useArrow(isMain, isFolder, getSrcFromFile(file));

  const onMouseUp = () => {
    if (!isFolder) return;

    const dragData = getDragData();

    if (!dragData || dragData.from !== `files` || dragData.name === name || file[dragData.name]) return;

    file[dragData.name] = dragData.file;
    delete dragData.parent[dragData.name];

    refreshFiles();
  };

  const onDoubleClick = () => file.type === `scene` && setHierarchy(file);

  function ChildsElement() {
    return (
      file.type !== `scene` &&
      Object.entries(file).map(
        ([key, value]) =>
          isCapitalized(key) && (
            <File parent={file} file={value} name={key} key={key} deep={deep + 1} path={path} />
          ),
      )
    );
  }

  const newArrElement = (type: string, defValue: TFile | {}): (() => void) | false =>
    isFolder &&
    (() =>
      setNameInput({
        cb: (newName: string) => {
          file[newName] = { type, ...defValue };

          arrowSignal.set(true);
          refreshFiles();
        },
      }));

  // this is JSX
  return FileElement({
    deep,
    name,
    arrowSignal,
    onClick: () => setInspector(<InspectorDisplay path={path} file={file} name={name} />),
    onMouseDown: () => {
      if (!isMain) setDragData({ from: `files`, parent, file, name });
    },

    onContextMenu: ({ pageX, pageY }) => {
      setContextMenu({
        x: pageX,
        y: pageY,
        "New File": newArrElement(`txt`, {}),
        "New Image": newArrElement(`img`, deepCopy(defaultAssets.boxImg)),
        "New Audio": newArrElement(`audio`, deepCopy(defaultAssets.audio)),
        "New Folder": newArrElement(`folder`, {}),
        "New Scene":
          isFolder &&
          (() =>
            setNameInput({
              cb: (newName: string) => {
                file[newName] = { type: `scene`, name: newName };

                arrowSignal.set(true);
                refreshFiles();
              },
            })),
        "Copy Path": file.type !== `folder` && (() => navigator.clipboard.writeText(path)),
        Rename:
          !isMain &&
          (() =>
            setNameInput({
              cb: (newName: string) => {
                if (name === newName) return;

                delete parent[name];
                parent[newName] = file;
                if (parent[newName].type === `scene`) {
                  parent[newName].name = newName;
                  refreshHierarchy();
                }
                refreshFiles();
              },
              value: name,
            })),
        Delete:
          !isMain &&
          (() => {
            delete parent[name];
            refreshFiles();
          }),
      });
    },

    ChildsElement,
    onMouseUp,
    onDoubleClick,
  });
}

function getSrcFromFile(file: TFile) {
  return (file.type === `img` && file?.src) || (file.type === `audio` && audioIconSrc);
}

type FileProps = {
  parent: TFile;
  file: TFile;
  name: string;
  path?: string;
  deep: number;
};
