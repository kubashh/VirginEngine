import { createElement } from "react"
import { editor, config, files } from "../../lib/consts"
import { useHover } from "../../lib/hooks"

const clearAssign = (old, obj) => {
  for (const key in old) {
    delete old[key]
  }

  for (const key in obj) {
    old[key] = obj[key]
  }
}

const load = () =>
  createElement({
    name: `input`,
    type: `file`,
    accept: `.deathengine`,
    onchange: ({ target }) => {
      const reader = new FileReader()

      reader.onload = ({ target }) => {
        const data = JSON.parse(target.result)

        clearAssign(config, data.config)
        clearAssign(files, data.files)

        editor.setUp = true
        editor.reloadApp()
      }

      reader.readAsText(target.files[0])
    },
    click: true
  })

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
        textDecoration: `none`,
        color: `white`,
        fontSize: 60,
        width: 500,
        cursor: `pointer`,
        whiteSpace: `nowrap`,
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

const newProject = () => {
  editor.setUp = true
  editor.reloadApp()
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
        onClick={load}
        style={{ marginTop: `35vh` }}
      />
      <LoadDataButton text="New project" onClick={newProject} />
    </div>
  ) : null
