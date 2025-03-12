import { useState } from "react"
import { InspectorSection } from "../../inspector/InspectorSection"
import { isCustomProp } from "../../../lib/utils"
import { editor } from "../../../lib/consts"
import { AddComponent } from "./AddComponent"
import { useRefresh } from "../../../lib/hooks"

const TextElement = ({ object, access }) => {
  const [text, setText] = useState(object[access])

  return (
    <>
      <div>{access}</div>
      <textarea
        style={{ width: `90%` }}
        value={text}
        onChange={({ target: { value } }) => {
          object[access] = value
          setText(value)
        }}
      />
    </>
  )
}

// TODO remove button on evry script element, script element as InspectorSection
export const Script = ({ object }) => {
  const refresh = useRefresh()

  return (
    <InspectorSection
      text="Sctipt"
      object={object}
      element={
        <>
          {Object.keys(object)
            .filter((key) => isCustomProp(key))
            .map((key) => (
              <TextElement object={object} key={key} access={key} />
            ))}
          <AddComponent
            text="Add Script"
            onClick={() =>
              editor.setNameInput([
                (text) => {
                  for (const key of Object.keys(object)) {
                    if (key === text) return
                  }

                  object[text] = `0`
                  refresh()
                },
                ``,
                true
              ])
            }
          />
        </>
      }
    />
  )
}
