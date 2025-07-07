import FileElement from "../components/FileElement"
import { editor } from "../lib/consts"
import { defaultGameObject, includesKeywords, isFirstUpperCase } from "../lib/utils"
import { useArrow } from "../lib/hooks"
import { setComponents } from "./components/componentsLib"

function getChilds(obj: Obj = {}) {
  return Object.keys(obj).reduce(
    (prev, key) => (!includesKeywords(key) && isFirstUpperCase(key) ? { [key]: obj[key], ...prev } : prev),
    {}
  )
}

export default function GameObject({ old, name, object, deep = 0 }: GameObjectProps) {
  const main = deep === 0
  const childs = getChilds(object)
  const haveChilds = Object.keys(childs)?.length > 0

  const [arrow, open, setOpen] = useArrow(main, haveChilds)

  const onClick = () => !main && setComponents({ old, object, name })

  const onContextMenu = ({ pageX, pageY }: MouseEvent) => {
    editor.setContextMenu([
      pageX,
      pageY,
      [
        () => {
          editor.setNameInput([
            (newName: string) => {
              if (Object.keys(object).includes(newName)) return

              object[newName] = defaultGameObject()

              // @ts-ignore
              setOpen(true)
              editor.reloadHierarchy()
            },
          ])
        },
        `New Object`,
      ],
      [
        () => {
          editor.setNameInput([
            (newName: string) => {
              if (name === newName || old[newName]) return

              delete old[name]
              old[newName] = object
              editor.reloadHierarchy()
            },
            name,
          ])
        },
        `Rename`,
        !main,
      ],
      [
        () => {
          delete old[name]
          editor.reloadHierarchy()
        },
        `Delete`,
        !main,
      ],
    ])
  }

  const onMouseDown: React.MouseEventHandler = (event) =>
    !main && editor.setDragData({ from: `hierarchy`, old, file: object, name }, event)

  const onMouseUp = () => {
    const { dragData }: { dragData: any } = editor

    if (!dragData || dragData.name === name || dragData.file.type !== `gameObject`) return

    for (const key in childs) {
      if (key === dragData.name) return
    }

    object[dragData.name] = dragData.file
    if (dragData.from === `hierarchy` && dragData.old) {
      delete dragData.old[dragData.name]
    }

    editor.reloadHierarchy()
  }

  const childsElement =
    open &&
    Object.entries(childs).map(([key, value]) => (
      <GameObject old={object} object={value} key={key} name={key} deep={deep + 1} />
    ))

  return FileElement({
    deep,
    name,
    arrow,
    childsElement,
    onClick,
    onContextMenu,
    onMouseDown,
    onMouseUp,
  })
}
