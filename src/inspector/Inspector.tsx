import Window from "../components/Window"
import InspectorSection from "./InspectorSection"
import { config, files, inspector } from "../lib/consts"
import { downloadFile, loadFile } from "../lib/utils"
import { build, test } from "../build/build"

function save() {
  downloadFile(`${config.gameName}.virginengine`, JSON.stringify({ config, files: files.value }))
}

if (typeof window !== `undefined`)
  window.addEventListener(`keydown`, (e) => {
    if (e.ctrlKey && e.key === `s`) {
      e.preventDefault()
      save()
    }
  })

function Config() {
  return (
    <InspectorSection
      text="Config"
      childs={Object.keys(config)
        .filter((key) => key !== `type`)
        .map((key) => ({ text: key, object: config, access: key }))}
    />
  )
}

const editorOpctions = {
  Test: test,
  Save: save,
  Build: build,
  Load: loadFile,
  Config: () => (inspector.value = <Config />),
}

function InspectorComponent() {
  inspector.bind()
  return inspector.value
}

export default function Inspector() {
  return (
    <Window
      name="Inspenctor"
      className="row-span-2 w-(--width3) border-l-1 border-solid border-zinc-400"
      headerOptions={editorOpctions}
    >
      <div className="p-2 overflow-y-scroll">
        <InspectorComponent />
      </div>
    </Window>
  )
}
