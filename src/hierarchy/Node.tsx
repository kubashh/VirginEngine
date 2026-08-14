import FileElement from "../components/FileElement";
import { defaultNode } from "../lib/assets/assets";
import { dragDataSignal, keywords, nameInputSignal, refreshHierarchy, type TFile } from "../lib/consts";
import { isCapitalized } from "../lib/util";
import { useArrow } from "../lib/hooks";

export default function Node({ parent, name, object, deep = 0 }: NodeProps) {
  const isMain = deep === 0;
  const childs = getChilds(object);
  const haveChilds = Object.keys(childs)?.length > 0;

  const arrowSignal = useArrow(isMain, haveChilds);

  const onMouseUp = () => {
    const dragData = dragDataSignal.get();

    if (!dragData || dragData.name === name || dragData.file.type !== `node`) return;

    for (const key in childs) {
      if (key === dragData.name) return;
    }

    object[dragData.name] = dragData.file;
    if (dragData.from === `hierarchy`) {
      delete dragData.parent[dragData.name];
    }

    refreshHierarchy.refresh();
  };

  function ChildsElement() {
    return Object.entries(childs).map(([key, value]) => (
      <Node parent={object} object={value} key={key} name={key} deep={deep + 1} />
    ));
  }

  return FileElement({
    deep,
    isHierarchy: true,
    name,
    parent,
    file: object,
    arrowSignal,
    ChildsElement,
    contextMenuProps: {
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
        !isMain &&
        (() => {
          nameInputSignal.set({
            cb: (newName: string) => {
              if (name === newName || parent[newName]) return;

              delete parent[name];
              parent[newName] = object;
              refreshHierarchy.refresh();
            },
            value: name,
          });
        }),
      Delete:
        !isMain &&
        (() => {
          delete parent[name];
          refreshHierarchy.refresh();
        }),
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

type NodeProps = {
  parent: TFile;
  object: TFile;
  name: string;
  deep: number;
};
