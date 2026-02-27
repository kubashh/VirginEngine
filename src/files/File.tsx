import { useSignal } from "wdwh/signal";
import FileElement from "../components/FileElement";
import ImageGrabber from "../components/ImageGrabber";
import AudioGrabber from "../components/AudioGrabber";
import TypeInput from "../inspector/TypeInput";
import { contextMenu, def, dragData, files, inspector, nameInput } from "../lib/consts";
import { openScene, isFirstUpperCase, deepCopy } from "../lib/util";
import { useArrow } from "../lib/hooks";

export default function File({ old, file, name, deep = 0, path = `files` }: FileProps) {
  const main = deep === 0;
  if (!main) path += `.${name}`;
  const isFolder = file.type === `folder`;
  const [arrow, open] = useArrow(main, isFolder, file.type === `img` && file?.src);

  const onClick = () => {
    inspector.value = <InspectorDisplay file={file} name={name} />;
  };

  const onContextMenu = ({ pageX, pageY }: MouseEvent) => {
    const newArrElement = (name: string, type: string, def?: Any) => [
      () =>
        (nameInput.value = [
          (newName: string) => {
            file[newName] = { type, ...deepCopy(def) };

            open.value = true;
            files.refresh();
          },
        ]),
      name,
      isFolder,
    ];

    contextMenu.value = [
      pageX,
      pageY,
      newArrElement(`New file`, `txt`),
      newArrElement(`New image`, `img`, deepCopy(def.img)),
      newArrElement(`New audio`, `audio`, deepCopy(def.audio)),
      newArrElement(`New folder`, `folder`),
      newArrElement(`New scene`, `scene`),
      [
        () =>
          (nameInput.value = [
            (newName: string) => {
              if (name === newName) return;

              delete old[name];
              old[newName] = file;
              files.refresh();
            },
            name,
          ]),
        `Rename`,
        !main,
      ],
      [() => navigator.clipboard.writeText(path), `Copy path`],
      [
        () => {
          delete old[name];
          files.refresh();
        },
        `Delete`,
        !main,
      ],
    ];
  };

  const onMouseDown = () => {
    if (!main) dragData.value = { from: `files`, old, file, name };
  };

  const onMouseUp = () => {
    if (!isFolder) return;

    const dragDat = dragData.value;

    if (dragDat?.from !== `files` || dragDat.name === name || file[dragDat.name]) return;

    file[dragDat.name] = dragDat.file;
    if (dragDat.old) {
      delete dragDat.old[dragDat.name];
    }

    files.refresh();
  };

  const onDoubleClick = () => file.type === `scene` && openScene(file);

  const childsElement =
    open.value &&
    file.type !== `scene` &&
    Object.entries(file).map(
      ([key, value]) =>
        isFirstUpperCase(key) && (
          <File old={file} file={value} name={key} key={key} deep={deep + 1} path={path} />
        ),
    );

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

function InspectorDisplay({ file, name }: InspectorDisplayProps) {
  const src = useSignal(file.src, () => (file.src = src.value));

  return (
    <div className="m-3">
      <h2 className="text-2xl font-bold">File</h2>
      <div>Type: {file.type}</div>
      <div>Name: {name}</div>
      {(file.type === `img` && (
        <div>
          <ImageGrabber src={src} name={name} />
          <TypeInput object={file} access="quality" />
        </div>
      )) ||
        (file.type === `audio` && (
          <div>
            <AudioGrabber src={src} name={name} />
            <TypeInput object={file} access="quality" />
          </div>
        )) ||
        null}
    </div>
  );
}
