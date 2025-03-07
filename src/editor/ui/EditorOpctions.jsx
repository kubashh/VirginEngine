import { test, build } from "../../build/build"
import { Config } from "./Config"
import { config, editor, files } from "../../lib/consts"
import { useHover } from "../../lib/hooks"
import { downloadFile } from "../../lib/utils"

const load = () => {
  editor.setUp = false
  editor.reload()
}

export const save = () =>
  downloadFile(
    `${config.gameName}.deathengine`,
    JSON.stringify({ config, files })
  )

const onConfig = () => editor.setInspector(<Config />)

const CustomInput = ({ text, onClick }) => {
  return (
    <input
      type="button"
      value={text}
      style={{ border: 0, height: 30 }}
      onClick={onClick}
    />
  )
}

export const EditorOpctions = () => {
  const [isHover, hover] = useHover()

  return (
    <div style={{ position: `absolute`, zIndex: 1, right: 0 }} {...hover}>
      <div
        style={{
          position: `absolute`,
          cursor: `pointer`,
          right: 0,
          width: 25,
          height: 25,
          border: `3px solid #333`,
          textAlign: `center`
        }}
        children="S"
      />
      {isHover && (
        <div
          style={{
            position: `absolute`,
            inset: `30px 0 auto auto`,
            display: `grid`,
            gap: 4,
            backgroundColor: `#555`,
            padding: 4,
            width: 150
          }}
        >
          <CustomInput text="Save" onClick={save} />
          <CustomInput text="Test" onClick={test} />
          <CustomInput text="Build" onClick={build} />
          <CustomInput text="Load" onClick={load} />
          <CustomInput text="Config" onClick={onConfig} />
        </div>
      )}
    </div>
  )
}
