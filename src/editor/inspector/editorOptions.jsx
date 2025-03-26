import { config, editor, files } from "../../lib/consts"
import { downloadFile, loadFile } from "../../lib/utils"
import { build, test } from "../../build/build"
import { InspectorSection } from "./InspectorSection"

const save = () =>
  downloadFile(
    `${config.gameName}.virginengine`,
    JSON.stringify({ config, files })
  )

window.addEventListener(`keydown`, (e) => {
  if (e.ctrlKey && e.key === `s`) {
    e.preventDefault()
    save()
  }
})

const Config = () => (
  <InspectorSection
    text="Config"
    childs={Object.keys(config)
      .filter((key) => key !== `type`)
      .map((key) => ({ text: key, object: config, access: key }))}
  />
)

const onConfig = () => editor.setInspector(<Config />)

export const editorOpctions = {
  Test: test,
  Save: save,
  Build: build,
  Load: loadFile,
  Config: onConfig
}
