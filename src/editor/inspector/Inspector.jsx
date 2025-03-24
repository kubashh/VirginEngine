import { useState } from "react"
import { config, editor, files } from "../../lib/consts"
import { Header } from "../../lib/components"
import { Config } from "../ui/Config"
import { build, test } from "../../build/build"
import { downloadFile, loadFile } from "../../lib/utils"

const save = () =>
  downloadFile(
    `${config.gameName}.deathengine`,
    JSON.stringify({ config, files })
  )

window.addEventListener(`keydown`, (e) => {
  if (e.ctrlKey && e.key === `s`) {
    e.preventDefault()
    save()
  }
})

const onConfig = () => editor.setInspector(<Config />)

const editorOpctions = {
  Test: test,
  Save: save,
  Build: build,
  Load: loadFile,
  Config: onConfig
}

const InspectorComponent = () => {
  const [element, setElement] = useState()
  editor.setInspector = setElement

  return element
}

export const Inspector = () => (
  <section id="inspector">
    <Header text="Inspenctor" {...editorOpctions} />
    <div className="scroll" children={<InspectorComponent />} />
  </section>
)
