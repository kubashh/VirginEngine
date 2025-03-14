import { useArrow } from "../../lib/hooks"
import { isFirstUpperCase } from "../../lib/utils"
import { openScene } from "../../lib/utils"
import { editor } from "../../lib/consts"
import { FileElement } from "../../lib/components"

export const File = ({ old, file, name, main, deep = 0, path = `files` }) => {
  if (!main) path += `.${name}`
  const isFolder = file.type === `folder`
  const [arrow, open, setOpen] = useArrow(main, isFolder)

  const onClick = () => {
    editor.setInspector(
      <div style={{ margin: 12 }}>
        <h2>File</h2>
        <div>{`Type: ${file.type}`}</div>
        <div>{`Name: ${name}`}</div>
      </div>
    )
  }

  const onContextMenu = ({ pageX, pageY }) => {
    const newArrElement = (name, type) => [
      () =>
        editor.setNameInput([
          (newText) => {
            file[newText] = { type }

            setOpen(true)
            editor.reloadFiles()
          }
        ]),
      name,
      isFolder
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
            (newText) => {
              if (name === newText) return

              delete old[name]
              old[newText] = file
              editor.reloadFiles()
            },
            name
          ]),
        `Rename`,
        !main
      ],
      [() => navigator.clipboard.writeText(path), `Copy path`],
      [
        () => {
          delete old[name]
          editor.reloadFiles()
        },
        `Delete`,
        !main
      ]
    ])
  }

  const onMouseDown = (event) =>
    !main && editor.setDragData({ from: `files`, old, file, name }, event)

  const onMouseUp = () => {
    if (!isFolder) return

    const { dragData } = editor

    if (
      dragData?.from !== `files` ||
      dragData.name === name ||
      file[dragData.name]
    )
      return

    file[dragData.name] = dragData.file
    if (dragData.old) {
      delete dragData.old[dragData.name]
    }

    editor.reloadFiles()
  }

  const onDoubleClick = () => file.type === `scene` && openScene(file, name)

  const childsElement =
    isFolder &&
    open &&
    file.type !== `scene` &&
    Object.entries(file).map(
      ([key, value]) =>
        isFirstUpperCase(key) && (
          <File
            old={file}
            file={value}
            name={key}
            key={key}
            deep={deep + 1}
            path={path}
          />
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
    onDoubleClick
  })
}
