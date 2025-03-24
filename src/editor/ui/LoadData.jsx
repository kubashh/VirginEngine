import { editor } from "../../lib/consts"
import { useRefresh } from "../../lib/hooks"
import { loadFile, openMainScene } from "../../lib/utils"

const newProject = () => {
  openMainScene()
  editor.reloadApp()
}

const LoadDataButton = ({ text, onClick, style }) => (
  <input
    className="hover transition block textAlign"
    style={{
      padding: `20px 50px`,
      border: `4px solid gray`,
      margin: `60px auto`,
      fontSize: 54,
      width: 500,
      ...style
    }}
    type="button"
    value={text}
    onClick={onClick}
  />
)

export const LoadData = () => {
  editor.reloadLoadData = useRefresh()

  return !editor.setUp ? (
    <div
      className="absolute fullwh zIndex"
      style={{ backgroundColor: `rgba(0, 0, 0, 0.5)` }}
    >
      <LoadDataButton
        text="Load Project"
        onClick={loadFile}
        style={{ marginTop: `calc(40vh - 116px)` }}
      />
      <LoadDataButton text="New project" onClick={newProject} />
    </div>
  ) : null
}
