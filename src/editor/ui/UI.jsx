import { ContextMenu } from "./ContextMenu"
import { save } from "./save"

export const UI = () => {
  const inputStyle = {
    border: 0,
    padding: "8px 16px",
    width: 100,
    height: 30
  }

  return <div
    style={{
      position: "absolute"
    }}
  >
    <div
      style={{
        position: "absolute",
        zIndex: 1,
        display: "flex",
        flexDirection: "row",
        left: window.data.editor.width - 100
      }}
    >
      <input
        type="button"
        value="Save"
        style={inputStyle}
        onClick={save}
      />
    </div>
    <ContextMenu />
  </div>
}