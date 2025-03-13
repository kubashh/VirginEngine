import { useArrow } from "../../lib/hooks"
import { setComponents } from "./components/componentsLib"
import {
  defaultGameObject,
  includesKeywords,
  isFirstUpperCase
} from "../../lib/utils"
import { editor, files } from "../../lib/consts"
import { FileElement } from "../../lib/components"

const getChilds = (obj) => {
  const childs = {}

  for (const key in obj) {
    if (!includesKeywords(key) && isFirstUpperCase(key)) {
      childs[key] = obj[key]
    }
  }

  return childs
}

export const GameObject = ({ old, name, object, main, deep = 0 }) => {
  const childs = getChilds(object)
  const haveChilds = Object.keys(childs)?.length > 0

  const [arrow, open, setOpen] = useArrow(main, haveChilds)

  const onClick = () => {
    if (main) return

    setComponents({
      old,
      object,
      name
    })
  }

  const onContextMenu = ({ pageX, pageY }) => {
    editor.setContextMenu([
      pageX,
      pageY,
      [
        () => {
          editor.setNameInput({
            cb: (newText) => {
              if (Object.keys(object).includes(newText)) return

              object[newText] = defaultGameObject()

              setOpen(true)
              editor.reloadHierarchy()
            }
          })
        },
        `New Object`
      ],
      [
        () => {
          editor.setNameInput({
            cb: (newText) => {
              if (name === newText) return

              if (main) {
                old = files.Scenes
                editor.selectedScene = newText
              }

              if (old[newText]) return

              delete old[name]
              old[newText] = object
              editor.reloadHierarchy()
            },
            text: name
          })
        },
        `Rename`,
        !main
      ],
      [
        () => {
          delete old[name]
          editor.reloadHierarchy()
        },
        `Delete`,
        !main
      ]
    ])
  }

  const onMouseDown = (event) =>
    !main &&
    editor.setDragData({ from: `hierarchy`, old, file: object, name }, event)

  const onMouseUp = () => {
    const { dragData } = editor

    if (
      !dragData ||
      dragData.name === name ||
      dragData.file.type !== `gameObject`
    )
      return

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
    haveChilds &&
    open &&
    Object.entries(childs).map(([key, value]) => (
      <GameObject
        old={object}
        object={value}
        key={key}
        name={key}
        deep={deep + 1}
      />
    ))

  return FileElement({
    deep,
    name,
    arrow,
    childsElement,
    onClick,
    onContextMenu,
    onMouseDown,
    onMouseUp
  })
}
