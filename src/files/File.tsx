import FileElement from "../components/FileElement"
import { dragData, editor, inspector, nameInput } from "../lib/consts"
import { openScene, isFirstUpperCase } from "../lib/utils"
import { useArrow } from "../lib/hooks"

export default function File({ old, file, name, deep = 0, path = `files` }: FileProps) {
  const main = deep === 0
  if (!main) path += `.${name}`
  const isFolder = file.type === `folder`
  const [arrow, open, setOpen] = useArrow(main, isFolder)

  const onClick = () => {
    inspector.value = (
      <div className="m12">
        <h1 children="File" />
        <h3 children={`Type: ${file.type}`} />
        <h3 children={`Name: ${name}`} />
      </div>
    )
  }

  const onContextMenu = ({ pageX, pageY }: MouseEvent) => {
    const newArrElement = (name: string, type: string) => [
      () =>
        (nameInput.value = [
          (newName: string) => {
            file[newName] = { type }

            // @ts-ignore
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
          (nameInput.value = [
            (newName: string) => {
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

  const onMouseDown = (event: MouseEvent) => {
    if (!main) dragData.value = { from: `files`, old, file, name }
  }

  const onMouseUp = () => {
    if (!isFolder) return

    const dragDat = dragData.value

    if (dragDat?.from !== `files` || dragDat.name === name || file[dragDat.name]) return

    file[dragDat.name] = dragDat.file
    if (dragDat.old) {
      delete dragDat.old[dragDat.name]
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
