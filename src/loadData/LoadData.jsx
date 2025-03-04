import { editor } from "../lib/consts"
import { useHover } from "../lib/hooks"
import { load } from "./load"

const LoadDataButton = ({ text, onClick, style }) => {
  const hover = useHover(
    { backgroundColor: `#444` },
    {
      display: `block`,
      backgroundColor: `black`,
      padding: `20px 50px`,
      border: `4px solid white`,
      margin: `60px auto`,
      textDecoration: `none`,
      color: `white`,
      fontSize: 60,
      width: 500,
      cursor: `pointer`,
      whiteSpace: `nowrap`,
      textAlign: `center`,
      transitionDuration: `200ms`,
      ...style
    }
  )

  return (
    <input
      className="hoverGray"
      {...hover}
      type="button"
      value={text}
      onClick={onClick}
    />
  )
}

const newProject = () => {
  editor.setUp = true
  editor.reload()
}

export const LoadData = () => (
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
      onClick={load}
      style={{ marginTop: `35vh` }}
    />
    <LoadDataButton text="New project" onClick={newProject} />
  </div>
)
