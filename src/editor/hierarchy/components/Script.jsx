import { useState } from "react"
import { InspectorSection } from "../../inspector/InspectorSection"
import {
  capitalize,
  getType,
  isCustomProp,
  isOccupied
} from "../../../lib/utils"
import { editor } from "../../../lib/consts"
import { AddComponent } from "./componentsLib"
import { TypeInput } from "../../inspector/TypeInput"

// Types
const scriptTypes = {
  bool: false,
  number: 0,
  string: `""`,
  array: `[]`,
  object: `{}`,
  function: `function() {}`
}

const InputDefault = ({ object, access }) => {
  const [text, setText] = useState(object[access])

  return (
    <textarea
      style={{ width: `calc(100% - 12px)`, resize: `none` }}
      value={text}
      onChange={({ target: { value } }) => {
        object[access] = value
        setText(value)
      }}
    />
  )
}

const TextElement = ({ object, access, refresh }) => (
  <InspectorSection
    text={access}
    remove={() => {
      delete object[access]
      refresh()
    }}
    element={InputDefault({ object, access })}
  />
)

// Add script component
const AddScript = ({ object, value, refresh }) => (
  <AddComponent
    text={capitalize(value)}
    style={{ display: `inline` }}
    onClick={() =>
      editor.setNameInput([
        (text) => {
          if (isOccupied(object, text)) return

          object[text] = scriptTypes[value]
          refresh()
        },
        ``,
        true
      ])
    }
  />
)

export const Script = ({ object, refresh }) => {
  console.log(object)

  return (
    <>
      {Object.keys(object)
        .filter((key) => isCustomProp(key))
        .map((key) =>
          [`bool`, `number`, `string`].includes(getType(object[key])) ? (
            <InspectorSection
              key={key}
              text={key}
              element={<TypeInput access={key} object={object} />}
              remove={() => {
                delete object[key]
                refresh()
              }}
            />
          ) : (
            <TextElement
              key={key}
              access={key}
              object={object}
              refresh={refresh}
            />
          )
        )}
      <div className="wrap" style={{ marginBottom: 16 }}>
        {Object.keys(scriptTypes).map((value) => (
          <AddScript
            key={value}
            value={value}
            object={object}
            refresh={refresh}
          />
        ))}
      </div>
    </>
  )
}
