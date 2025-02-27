import { ContextMenu } from "./ContextMenu"
import { DragData } from "./DragData"
import { EditorOpctions } from "./EditorOpctions"
import { NameInput } from "./NameInput"

export const UI = () => {
  return (
    <>
      <EditorOpctions />
      <ContextMenu />
      <NameInput />
      <DragData />
    </>
  )
}
