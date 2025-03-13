import { useState } from "react"
import { InspectorSection } from "../../inspector/InspectorSection"
import { capitalize, isCustomProp, isOccupied } from "../../../lib/utils"
import { editor } from "../../../lib/consts"
import { useRefresh } from "../../../lib/hooks"
import { AddComponent } from "./componentsLib"
import { inputPropsBool } from "../../inspector/TypeInput"

// Types
const scriptTypes = {
  bool: [`false`],
  number: [`0`],
  string: [`""`, `"`, `"`],
  array: [`[]`, `[`, `]`],
  object: [`{}`, `{`, `}`],
  function: [`function() {}`, `function`, ``]
}

// Types functions
const getType = (text) => {
  if (text[0] === `"`) return `string`
  if (text === `false` || text === `true`) return `bool`
  if (text === Number(text).toString()) return `number`
  if (text[0] === `[`) return `array`
  if (text[0] === `{`) return `object`
  if (text.includes(`function(`)) return `function`
  return null
}

const typeToEditor = (text) => {
  const type = getType(text)

  if ([`string`, `array`, `object`, `function`].includes(type)) {
    return text.slice(
      scriptTypes[type][1].length,
      -scriptTypes[type][2].length || undefined
    )
  }
  return text
}

const typeFromEditor = (text, type) => {
  if ([`string`, `array`, `object`, `function`].includes(type)) {
    return `${scriptTypes[type][1]}${text}${scriptTypes[type][2]}`
  }
  return text
}

// Inputs
const InputDefault = ({ object, access }) => {
  const type = getType(object[access])

  const [text, setText] = useState(object[access])

  return (
    <textarea
      style={{ width: `90%` }}
      value={typeToEditor(text)}
      onChange={({ target: { value } }) => {
        value = typeFromEditor(value, type)

        object[access] = value
        setText(value)
      }}
    />
  )
}

/*const InputBool = (props) => {
  return
  const { onChange, ...rest } = inputPropsBool(props)
  return (
    <input
      {...rest}
      onChange={(e) => {
        onChange(e)
        props.object[props.access] = String(props.object[props.access])
      }}
    />
  )
}*/

const TextElement = ({ object, access, refresh }) => {
  const type = getType(object[access])

  const props = { object, access }
  let inp
  switch (type) {
    //case `bool`:
    //  inp = InputBool(props)
    //  break
    default:
      inp = InputDefault(props)
  }

  return (
    <InspectorSection
      text={access}
      object={object}
      remove={() => {
        delete object[access]
        refresh()
      }}
      element={inp}
    />
  )
}

// Add script component
const AddScript = ({ object, value, refresh }) => (
  <AddComponent
    text={capitalize(value)}
    style={{ display: `inline` }}
    onClick={() =>
      editor.setNameInput({
        cb: (text) => {
          if (isOccupied(object, text)) return

          object[text] = scriptTypes[value][0]
          refresh()
        },
        text: ``,
        lowerCase: true
      })
    }
  />
)

export const Script = ({ object }) => {
  const refresh = useRefresh()

  return (
    <>
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
      {Object.keys(scriptTypes).map((value) => (
        <AddScript
          value={value}
          key={value}
          object={object}
          refresh={refresh}
        />
      ))}
    </>
  )
}
