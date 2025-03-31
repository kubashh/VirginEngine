import { editor } from "../../lib/consts"
import { useRefresh } from "../../lib/hooks"
import { loadFile, openMainScene } from "../../lib/utils"

const newProject = () => {
  openMainScene()
  editor.reloadApp()
}

const LoadDataButton = ({ text, onClick }) => (
  <input
    className="p20_50 b_c2 hover"
    style={{ margin: `30px auto`, fontSize: 54, width: 500 }}
    type="button"
    value={text}
    onClick={onClick}
  />
)

export const LoadData = () => {
  editor.reloadLoadData = useRefresh()

  return !editor.setUp ? (
    <div className="zAbsolute whFull bgc000_50p column justifyContent fadeIn">
      <LoadDataButton text="Load Project" onClick={loadFile} />
      <LoadDataButton text="New project" onClick={newProject} />
    </div>
  ) : null
}
