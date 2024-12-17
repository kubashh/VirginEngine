import { ContextMenu } from "./ContextMenu"
import { EditorOpctions } from "./EditorOpctions"
import { NameInput } from "./NameInput"

export const UI = () => {
  return <div
    style={{
      position: `absolute`,
      left: 0,
      top: 0
    }}
  >
    <EditorOpctions />
    <ContextMenu />
    <NameInput />
  </div>
}