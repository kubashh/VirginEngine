import { useArrow } from "../../lib/hooks"
import { isFirstUpperCase } from "../../lib/utils"
import { openScene } from "../../lib/utils"
import { editor } from "../../lib/consts"
import { FileElement } from "../../lib/components"

export default function File({ old, file, name, main, deep = 0, path = `files` }) {
  if (!main) path += `.${name}`
  const isFolder = file.type === `folder`
  const [arrow, open, setOpen] = useArrow(main, isFolder)

  const onClick = () => {
    editor.setInspector(
      <div className="m12">
        <h1 children="File" />
        <h3 children={`Type: ${file.type}`} />
        <h3 children={`Name: ${name}`} />
      </div>
    )
  }

  const onContextMenu = ({ pageX, pageY }) => {
    const newArrElement = (name, type) => [
      () =>
        editor.setNameInput([
          (newName) => {
            file[newName] = { type }

            setOpen(true)
            editor.reloadFiles()
          },
        ]),
      name,
      isFolder,
    ]

    editor.setContextMenu([
      pageX,
      pageY,
      newArrElement(`New file`, `txt`),
      newArrElement(`New folder`, `folder`),
      newArrElement(`New scene`, `scene`),
      [
        () =>
          editor.setNameInput([
            (newName) => {
              if (name === newName) return

              delete old[name]
              old[newName] = file
              editor.reloadFiles()
            },
            name,
          ]),
        `Rename`,
        !main,
      ],
      [() => navigator.clipboard.writeText(path), `Copy path`],
      [
        () => {
          delete old[name]
          editor.reloadFiles()
        },
        `Delete`,
        !main,
      ],
    ])
  }

  const onMouseDown = (event) => !main && editor.setDragData({ from: `files`, old, file, name }, event)

  const onMouseUp = () => {
    if (!isFolder) return

    const { dragData } = editor

    if (dragData?.from !== `files` || dragData.name === name || file[dragData.name]) return

    file[dragData.name] = dragData.file
    if (dragData.old) {
      delete dragData.old[dragData.name]
    }

    editor.reloadFiles()
  }

  const onDoubleClick = () => file.type === `scene` && openScene(file, name)

  const childsElement =
    open &&
    file.type !== `scene` &&
    Object.entries(file).map(
      ([key, value]) =>
        isFirstUpperCase(key) && (
          <File old={file} file={value} name={key} key={key} deep={deep + 1} path={path} />
        )
    )

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
  })
}
