import { useState } from "react"
import { InspectorSection } from "../../inspector/InspectorSection"
import { isCustomProp } from "../../../lib/utils"
import { editor } from "../../../lib/consts"

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

export const Script = ({ object }) => {
  const [state, setState] = useState(0)

  const refresh = () => setState(state + 1)

  return (
    <InspectorSection
      text="Sctipt"
      element={
        <div>
          {Object.keys(object)
            .filter((key) => isCustomProp(key))
            .map((key) => (
              <TextElement
                object={object}
                key={key}
                access={key}
                refresh={refresh}
              />
            ))}
          <input
            type="button"
            value={`+ Add script`}
            style={{
              padding: `6px 12px`,
              fontSize: 16
            }}
            onClick={() =>
              editor.setNameInput([
                ``,
                (text) => {
                  for (const key of Object.keys(object)) {
                    if (key === text) return
                  }

                  object[text] = `0`
                  refresh()
                },
                true
              ])
            }
          />
        </div>
      }
    />
  )
}
