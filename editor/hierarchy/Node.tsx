import { keywords, type TFile } from "../lib/consts";
import { isCapitalized } from "../lib/util";
import { useArrow } from "../lib/hooks";
import { FileElement } from "../lib/components/FileElement";
import { refreshHierarchy } from "./Hierarchy";
import { setNameInput } from "../ui/NameInput";
import { getDragData, setDragData } from "../ui/DragData";
import { InspectorDisplay } from "../files/InspectorDisplay";
import { setInspector } from "../inspector/Inspector";
import { setComponents } from "./components/componentsLib";
import { setContextMenu } from "../ui/ContextMenu";

export function Node({ parent, name, object, deep = 0 }: NodeProps) {
  const isMain = deep === 0;
  const childs = getChilds(object);
  const haveChilds = Object.keys(childs)?.length > 0;

  const arrowSignal = useArrow(isMain, haveChilds);

  const onMouseUp = () => {
    const dragData = getDragData();

    if (!dragData || dragData.name === name || dragData.file.type !== `node`) return;

    for (const key in childs) {
      if (key === dragData.name) return;
    }

    object[dragData.name] = dragData.file;
    if (dragData.from === `hierarchy`) {
      delete dragData.parent[dragData.name];
    }

    refreshHierarchy();
  };

  function ChildsElement() {
    return Object.entries(childs).map(([key, value]) => (
      <Node parent={object} object={value} key={key} name={key} deep={deep + 1} />
    ));
  }

  return FileElement({
    deep,
    name,
    arrowSignal,
    ChildsElement,
    onClick: () =>
      !isMain
        ? setComponents({ parent, object, name })
        : setInspector(<InspectorDisplay file={object} name={name} />),
    onMouseDown: () => {
      if (!isMain) setDragData({ from: `hierarchy`, parent, file: object, name });
    },

    onContextMenu: ({ pageX, pageY }) => {
      setContextMenu({
        x: pageX,
        y: pageY,
        "New Object": () => {
          setNameInput({
            cb: (newName: string) => {
              if (Object.keys(object).includes(newName)) return;

              object[newName] = defaultNode();

              arrowSignal.set(true);
              refreshHierarchy();
            },
          });
        },
        Rename:
          !isMain &&
          (() => {
            setNameInput({
              cb: (newName: string) => {
                if (name === newName || parent[newName]) return;

                delete parent[name];
                parent[newName] = object;
                refreshHierarchy();
              },
              value: name,
            });
          }),
        Delete:
          !isMain &&
          (() => {
            delete parent[name];
            refreshHierarchy();
          }),
      });
    },

    onMouseUp,
  });
}

function getChilds(obj: TFile): TObj<TFile> {
  return Object.keys(obj).reduce(
    (prev, key) => (!keywords.includes(key) && isCapitalized(key) ? { [key]: obj[key], ...prev } : prev),
    {},
  );
}

function defaultNode() {
  return {
    type: `node`,
    transform: {
      position: { x: 0, y: 0 },
      rotation: 0,
      scale: { x: 1, y: 1 },
    },
  };
}

type NodeProps = {
  parent: TFile;
  object: TFile;
  name: string;
  deep: number;
};
