import FileElement from "../components/FileElement";
import InspectorDisplay from "./InspectorDisplay";
import {
  contextMenuSignal,
  hierarchySignal,
  defaultAssets,
  dragDataSignal,
  inspectorSignal,
  nameInputSignal,
  refreshFiles,
} from "../lib/consts";
import { isCapitalized, deepCopy } from "../lib/util";
import { useArrow } from "../lib/hooks";

export default function File({ old, file, name, deep = 0, path = `files` }: FileProps) {
  const isMain = deep === 0;
  if (!isMain) path += `.${name}`;
  const isFolder = file.type === `folder`;
  const [arrow, open] = useArrow(isMain, isFolder, file.type === `img` && file?.src);

  const onClick = () => {
    inspectorSignal.set(<InspectorDisplay file={file} name={name} />);
  };

  const onContextMenu = ({ pageX, pageY }: MouseEvent) => {
    const newArrElement = (name: string, type: string, defValue: TObj = {}) => [
      () =>
        nameInputSignal.set([
          (newName: string) => {
            file[newName] = { type, ...deepCopy(defValue) };

            open.set(true);
            refreshFiles.refresh();
          },
        ]),
      name,
      isFolder,
    ];

    contextMenuSignal.set([
      pageX,
      pageY,
      newArrElement(`New file`, `txt`),
      newArrElement(`New image`, `img`, deepCopy(defaultAssets.img)),
      newArrElement(`New audio`, `audio`, deepCopy(defaultAssets.audio)),
      newArrElement(`New folder`, `folder`),
      newArrElement(`New scene`, `scene`),
      [
        () =>
          nameInputSignal.set([
            (newName: string) => {
              if (name === newName) return;

              delete old[name];
              old[newName] = file;
              refreshFiles.refresh();
            },
            name,
          ]),
        `Rename`,
        !isMain,
      ],
      [() => navigator.clipboard.writeText(path), `Copy path`],
      [
        () => {
          delete old[name];
          refreshFiles.refresh();
        },
        `Delete`,
        !isMain,
      ],
    ]);
  };

  const onMouseDown = () => {
    if (!isMain) dragDataSignal.set({ from: `files`, old, file, name });
  };

  const onMouseUp = () => {
    if (!isFolder) return;

    const dragData = dragDataSignal.get();

    if (dragData.from !== `files` || dragData.name === name || file[dragData.name]) return;

    file[dragData.name] = dragData.file;
    delete dragData.old[dragData.name];

    refreshFiles.refresh();
  };

  const onDoubleClick = () => file.type === `scene` && hierarchySignal.set(file);

  const childsElement =
    open.get() &&
    file.type !== `scene` &&
    Object.entries(file).map(
      ([key, value]) =>
        isCapitalized(key) && (
          <File old={file} file={value} name={key} key={key} deep={deep + 1} path={path} />
        ),
    );

  // this is JSX
  return FileElement({
    deep,
    name,
    arrow,
    childsElement,
    onClick,
    onContextMenu,
    onMouseDown,
    onMouseUp,
    onDoubleClick,
  });
}
