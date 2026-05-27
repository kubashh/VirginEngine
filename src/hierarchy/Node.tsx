import FileElement from "../components/FileElement";
import {
  contextMenuSignal,
  dragDataSignal,
  inspectorSignal,
  keywords,
  nameInputSignal,
  refreshHierarchy,
} from "../lib/consts";
import { defaultNode, isCapitalized } from "../lib/util";
import InspectorDisplay from "../files/InspectorDisplay";
import { useArrow } from "../lib/hooks";
import { setComponents } from "./components/componentsLib";

export default function Node({ old, name, object, deep = 0 }: NodeProps) {
  const main = deep === 0;
  !main && console.log(object);
  const childs = getChilds(object);
  const haveChilds = Object.keys(childs)?.length > 0;

  const arrowSignal = useArrow(main, haveChilds);

  const onClick = () =>
    !main
      ? setComponents({ old, object, name })
      : inspectorSignal.set(<InspectorDisplay file={object} name={name} />);

  const onContextMenu: React.MouseEventHandler<HTMLDivElement> = ({ pageX, pageY }) => {
    contextMenuSignal.set({
      x: pageX,
      y: pageY,
      "New Object": () => {
        nameInputSignal.set({
          cb: (newName: string) => {
            if (Object.keys(object).includes(newName)) return;

            object[newName] = defaultNode();

            arrowSignal.set(true);
            refreshHierarchy.refresh();
          },
        });
      },
      Rename:
        !main &&
        (() => {
          nameInputSignal.set({
            cb: (newName: string) => {
              if (name === newName || old[newName]) return;

              delete old[name];
              old[newName] = object;
              refreshHierarchy.refresh();
            },
            value: name,
          });
        }),
      Delete:
        !main &&
        (() => {
          delete old[name];
          refreshHierarchy.refresh();
        }),
    });
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

  function ChildsElement() {
    return Object.entries(childs).map(([key, value]) => (
      <Node old={object} object={value} key={key} name={key} deep={deep + 1} />
    ));
  }

  return FileElement({
    deep,
    name,
    arrowSignal,
    ChildsElement,
    onClick,
    onContextMenu,
    onMouseDown,
    onMouseUp,
  });
}

function getChilds(obj: TObj = {}) {
  return Object.keys(obj).reduce(
    (prev, key) => (!keywords.includes(key) && isCapitalized(key) ? { [key]: obj[key], ...prev } : prev),
    {},
  );
}
