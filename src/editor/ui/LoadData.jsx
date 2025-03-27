import { editor } from "../../lib/consts"
import { useRefresh } from "../../lib/hooks"
import { loadFile, openMainScene } from "../../lib/utils"

const newProject = () => {
  openMainScene()
  editor.reloadApp()
}

const LoadDataButton = ({ text, onClick }) => (
  <input className="hover" type="button" value={text} onClick={onClick} />
)

export const LoadData = () => {
  editor.reloadLoadData = useRefresh()

  return !editor.setUp ? (
    <div className="LoadData">
      <LoadDataButton text="Load Project" onClick={loadFile} />
      <LoadDataButton text="New project" onClick={newProject} />
    </div>
  ) : null
}
