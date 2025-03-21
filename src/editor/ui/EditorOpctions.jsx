import { test, build } from "../../build/build"
import { Config } from "./Config"
import { config, editor, files } from "../../lib/consts"
import { useHover } from "../../lib/hooks"
import { downloadFile, loadFile } from "../../lib/utils"

export const save = () =>
  downloadFile(
    `${config.gameName}.deathengine`,
    JSON.stringify({ config, files })
  )

const onConfig = () => editor.setInspector(<Config />)

const CustomInput = ({ text, onClick }) => (
  <input
    type="button"
    value={text}
    className="hover"
    style={{ border: 0, height: 30 }}
    onClick={onClick}
  />
)

const EditorOpctionsButton = () => (
  <div
    className="pointer absolute textAlign hover"
    style={{
      right: 0,
      width: 25,
      height: 25,
      border: `3px solid #333`
    }}
    children="S"
  />
)

const EditorOpctionsOnHover = () => (
  <div
    className="absolute"
    style={{
      inset: `30px 0 auto auto`,
      display: `grid`,
      gap: 4,
      backgroundColor: `#555`,
      padding: 4,
      width: 150
    }}
  >
    {console.log(`lkjd`)}
    <CustomInput text="Save" onClick={save} />
    <CustomInput text="Test" onClick={test} />
    <CustomInput text="Build" onClick={build} />
    <CustomInput text="Load" onClick={loadFile} />
    <CustomInput text="Config" onClick={onConfig} />
  </div>
)

export const EditorOpctions = () => {
  const [isHover, hover] = useHover()

  return (
    <div className="absolute" style={{ zIndex: 1, right: 0 }} {...hover}>
      <div>
        <EditorOpctionsButton />
        {isHover ? <EditorOpctionsOnHover /> : null}
      </div>
    </div>
  )
}
