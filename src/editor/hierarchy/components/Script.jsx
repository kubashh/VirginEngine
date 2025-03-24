import { useState } from "react"
import { InspectorSection } from "../../inspector/InspectorSection"
import { capitalize, isCustomProp, isOccupied } from "../../../lib/utils"
import { editor } from "../../../lib/consts"
import { useConst } from "../../../lib/hooks"
import { AddComponent } from "./componentsLib"

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
  if ([`false`, `true`].includes(text)) return `bool`
  if (text[0] === `"`) return `string`
  if (text === Number(text).toString()) return `number`
  if (text[0] === `[`) return `array`
  if (text[0] === `{`) return `object`
  if (text.indexOf(`function`) === 0) return `function`
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
  if (![`string`, `array`, `object`, `function`].includes(type)) return text
  return `${scriptTypes[type][1]}${text}${scriptTypes[type][2]}`
}

// Inputs
const handleOnChange =
  (object, access, setText, type) =>
  ({ target: { value } }) => {
    value = typeFromEditor(value, type)

    object[access] = value
    setText(value)
  }

const InputDefault = ({ object, access, type }) => {
  const [text, setText] = useState(object[access])

  return (
    <textarea
      style={{ width: `calc(100% - 12px)`, resize: `none` }}
      value={typeToEditor(text)}
      onChange={handleOnChange(object, access, setText, type)}
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

const InputNumberString = ({ object, access, type }) => {
  const [text, setText] = useState(object[access])

  return (
    <input
      type="text"
      value={typeToEditor(text)}
      onChange={handleOnChange(object, access, setText, type)}
    />
  )
}

const TextElement = ({ object, access, refresh }) => {
  const type = useConst(getType(object[access]))

  const props = { object, access, type }
  let inp
  switch (type) {
    case `bool`:
    case `number`:
    case `string`:
      inp = InputNumberString(props)
      break
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
      editor.setNameInput([
        (text) => {
          if (isOccupied(object, text)) return

          object[text] = scriptTypes[value][0]
          refresh()
        },
        ``,
        true
      ])
    }
  />
)

export const Script = ({ object, refresh }) => (
  <>
    {Object.keys(object)
      .filter((key) => isCustomProp(key))
      .map((key) => (
        <TextElement key={key} object={object} access={key} refresh={refresh} />
      ))}
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
