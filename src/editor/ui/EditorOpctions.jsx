import { save } from "./save"

export const EditorOpctions = () => {
  const inputStyle = {
    border: 0,
    padding: `8px 16px`,
    width: 100,
    height: 30
  }

  return <div
    style={{
      position: `absolute`,
      zIndex: 1,
      display: `flex`,
      flexDirection: `row`,
      left: window.editor.width - 100
    }}
  >
    <input
      type="button"
      value="Save"
      style={inputStyle}
      onClick={save}
    />
  </div>
}