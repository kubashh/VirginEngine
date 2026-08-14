import FileElement from "../components/FileElement";
import {
  hierarchySignal,
  defaultAssets,
  dragDataSignal,
  nameInputSignal,
  refreshFiles,
  type TFile,
} from "../lib/consts";
import { isCapitalized, deepCopy } from "../lib/util";
import { useArrow } from "../lib/hooks";
import { audioIconSrc } from "../lib/assets/assets";

export default function File({ parent, file, name, deep, path = `files` }: FileProps) {
  const isMain = deep === 0;
  if (!isMain) path += `.${name}`;
  const isFolder = file.type === `folder`;
  const arrowSignal = useArrow(isMain, isFolder, getSrcFromFile(file));

  const onMouseUp = () => {
    if (!isFolder) return;

    const dragData = dragDataSignal.get();

    if (!dragData || dragData.from !== `files` || dragData.name === name || file[dragData.name]) return;

    file[dragData.name] = dragData.file;
    delete dragData.parent[dragData.name];

    refreshFiles.refresh();
  };

  const onDoubleClick = () => file.type === `scene` && hierarchySignal.set(file);

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

  const newArrElement = (type: string, defValue?: TFile): Void | false =>
    isFolder &&
    (() =>
      nameInputSignal.set({
        cb: (newName: string) => {
          file[newName] = { type, ...deepCopy(defValue || {}) };

          arrowSignal.set(true);
          refreshFiles.refresh();
        },
      }));

  // this is JSX
  return FileElement({
    deep,
    isHierarchy: false,
    name,
    path,
    parent,
    file,
    arrowSignal,
    contextMenuProps: {
      "New File": newArrElement(`txt`),
      "New Image": newArrElement(`img`, deepCopy(defaultAssets.img)),
      "New Audio": newArrElement(`audio`, deepCopy(defaultAssets.audio)),
      "New Folder": newArrElement(`folder`),
      "New Scene": newArrElement(`scene`),
      "Copy Path": file.type !== `folder` && (() => navigator.clipboard.writeText(path)),
      Rename:
        !isMain &&
        (() =>
          nameInputSignal.set({
            cb: (newName: string) => {
              if (name === newName) return;

              delete parent[name];
              parent[newName] = file;
              refreshFiles.refresh();
            },
            value: name,
          })),
      Delete:
        !isMain &&
        (() => {
          delete parent[name];
          refreshFiles.refresh();
        }),
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
