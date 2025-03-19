import { editor } from "../../lib/consts"
import { useHover } from "../../lib/hooks"
import { loadFile, openMainScene } from "../../lib/utils"

const newProject = () => {
  openMainScene()
  editor.reloadApp()
}

const LoadDataButton = ({ text, onClick, style }) => {
  const [isHover, hover] = useHover()

  return (
    <input
      style={{
        display: `block`,
        backgroundColor: !isHover ? `black` : `#555`,
        padding: `20px 50px`,
        border: `4px solid white`,
        margin: `60px auto`,
        fontSize: 60,
        width: 500,
        textAlign: `center`,
        transitionDuration: `200ms`,
        ...style
      }}
      {...hover}
      type="button"
      value={text}
      onClick={onClick}
    />
  )
}

export const LoadData = () =>
  !editor.setUp ? (
    <div
      style={{
        position: `absolute`,
        width: `100vw`,
        height: `100vh`,
        backgroundColor: `rgba(0, 0, 0, 0.5)`,
        zIndex: 3
      }}
    >
      <LoadDataButton
        text="Load Project"
        onClick={loadFile}
        style={{ marginTop: `calc(40vh - 100px)` }}
      />
      <LoadDataButton text="New project" onClick={newProject} />
    </div>
  ) : null
