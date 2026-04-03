import FileElement from "../components/FileElement";
import {
  contextMenuSignal,
  dragDataSignal,
  keywords,
  nameInputSignal,
  refreshHierarchy,
} from "../lib/consts";
import { defaultNode, isCapitalized } from "../lib/util";
import { useArrow } from "../lib/hooks";
import { setComponents } from "./components/componentsLib";

function getChilds(obj: Any = {}) {
  return Object.keys(obj).reduce(
    (prev, key) => (!keywords.includes(key) && isCapitalized(key) ? { [key]: obj[key], ...prev } : prev),
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
    contextMenuSignal.set([
      pageX,
      pageY,
      [
        () => {
          nameInputSignal.set([
            (newName: string) => {
              if (Object.keys(object).includes(newName)) return;

              object[newName] = defaultNode();

              open.set(true);
              refreshHierarchy.refresh();
            },
          ]);
        },
        `New Object`,
      ],
      [
        () => {
          nameInputSignal.set([
            (newName: string) => {
              if (name === newName || old[newName]) return;

              delete old[name];
              old[newName] = object;
              refreshHierarchy.refresh();
            },
            name,
          ]);
        },
        `Rename`,
        !main,
      ],
      [
        () => {
          delete old[name];
          refreshHierarchy.refresh();
        },
        `Delete`,
        !main,
      ],
    ]);
  };

  const onMouseDown = () => {
    if (!main) dragDataSignal.set({ from: `hierarchy`, old, file: object, name });
  };

  const onMouseUp = () => {
    const dragDat = dragDataSignal.get();

    if (dragDat.name === name || dragDat.file.type !== `node`) return;

    for (const key in childs) {
      if (key === dragDat.name) return;
    }

    object[dragDat.name] = dragDat.file;
    if (dragDat.from === `hierarchy`) {
      delete dragDat.old[dragDat.name];
    }

    refreshHierarchy.refresh();
  };

  const childsElement =
    open.get() &&
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
