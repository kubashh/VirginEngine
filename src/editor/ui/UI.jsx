import { ContextMenu } from "./ContextMenu"
import { DragData } from "./DragData"
import { EditorOpctions } from "./EditorOpctions"
import { LoadData } from "./LoadData"
import { NameInput } from "./NameInput"

export const UI = () => {
  return (
    <>
      <LoadData />
      <EditorOpctions />
      <ContextMenu />
      <NameInput />
      <DragData />
    </>
  )
}
