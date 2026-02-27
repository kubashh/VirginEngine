import FileElement from "../components/FileElement";
import { contextMenu, currentScene, dragData, keywords, nameInput } from "../lib/consts";
import { defaultNode, isFirstUpperCase } from "../lib/util";
import { useArrow } from "../lib/hooks";
import { setComponents } from "./components/componentsLib";

function getChilds(obj: Any = {}) {
  return Object.keys(obj).reduce(
    (prev, key) => (!keywords.includes(key) && isFirstUpperCase(key) ? { [key]: obj[key], ...prev } : prev),
    {},
  );
}

export default function Node({ old, name, object, deep = 0 }: NodeProps) {
  const main = deep === 0;
  const childs = getChilds(object);
  const haveChilds = Object.keys(childs)?.length > 0;

  const [arrow, open] = useArrow(main, haveChilds);

  const onClick = () => !main && setComponents({ old, object, name });

  const onContextMenu = ({ pageX, pageY }: MouseEvent) => {
    contextMenu.value = [
      pageX,
      pageY,
      [
        () => {
          nameInput.value = [
            (newName: string) => {
              if (Object.keys(object).includes(newName)) return;

              object[newName] = defaultNode();

              open.value = true;
              currentScene.refresh();
            },
          ];
        },
        `New Object`,
      ],
      [
        () => {
          nameInput.value = [
            (newName: string) => {
              if (name === newName || old[newName]) return;

              delete old[name];
              old[newName] = object;
              currentScene.refresh();
            },
            name,
          ];
        },
        `Rename`,
        !main,
      ],
      [
        () => {
          delete old[name];
          currentScene.refresh();
        },
        `Delete`,
        !main,
      ],
    ];
  };

  const onMouseDown = () => {
    if (!main) dragData.value = { from: `hierarchy`, old, file: object, name };
  };

  const onMouseUp = () => {
    const dragDat = dragData.value;

    if (!dragDat || dragDat.name === name || dragDat.file.type !== `node`) return;

    for (const key in childs) {
      if (key === dragDat.name) return;
    }

    object[dragDat.name] = dragDat.file;
    if (dragDat.from === `hierarchy` && dragDat.old) {
      delete dragDat.old[dragDat.name];
    }

    currentScene.refresh();
  };

  const childsElement =
    open.value &&
    Object.entries(childs).map(([key, value]) => (
      <Node old={object} object={value} key={key} name={key} deep={deep + 1} />
    ));

  return FileElement({
    deep,
    name,
    arrow,
    childsElement,
    onClick,
    onContextMenu,
    onMouseDown,
    onMouseUp,
  });
}
