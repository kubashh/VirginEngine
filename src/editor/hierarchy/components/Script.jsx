import { InspectorSection } from "../../inspector/InspectorSection"
import {
  capitalize,
  getType,
  isCustomProp,
  isOccupied,
} from "../../../lib/utils"
import { editor } from "../../../lib/consts"
import { AddComponent } from "./componentsLib"
import { TypeInput } from "../../inspector/TypeInput"
import { useConst, useRefresh } from "../../../lib/hooks"
import { useRef } from "react"

const AdvancedInput = ({ object, access }) => {
  const type = useConst(getType(object[access]))

  return (
    <div className="row">
      <div className="flex gap12">
        <div>{access}</div>
        <div className="c3">: {type}</div>
        <div>=</div>
        {/* <div>{scriptTypes[type][2]}</div> */}
      </div>
      <InputDefault object={object} access={access} />
      {/* <div>{scriptTypes[type].at(-1)}</div> */}
    </div>
  )
}

const InputDefault = ({ object, access }) => {
  const refresh = useRefresh()
  const ref = useRef(null)

  return (
    <textarea
      ref={ref}
      className="w100p-12"
      style={{ height: ref?.current?.scrollHeight }}
      value={object[access]}
      onChange={({ target }) => {
        object[access] = target.value
        refresh()
      }}
    />
  )
}

// Types
const scriptTypes = {
  boolean: [false, TypeInput],
  number: [0, TypeInput],
  string: [`""`, TypeInput],
  array: [`[12, 43, "foo"]`, AdvancedInput, `[`, `]`],
  object: [`{}`, AdvancedInput, `{`, `}`],
  function: [`function() {}`, AdvancedInput, `function(`, `) {`, `}`],
}

// Add script component
const AddScript = ({ object, value, refresh }) => (
  <AddComponent
    text={capitalize(value)}
    onClick={() =>
      editor.setNameInput([
        (text) => {
          if (isOccupied(object, text)) return

          object[text] = scriptTypes[value][0]
          refresh()
        },
        ``,
        true,
      ])
    }
  />
)

export const Script = ({ object, refresh }) => (
  <>
    {Object.keys(object)
      .filter((key) => isCustomProp(key))
      .map((key) => (
        <InspectorSection
          key={key}
          text={key}
          element={scriptTypes[getType(object[key])][1]({
            object,
            access: key,
          })}
          remove={() => {
            delete object[key]
            refresh()
          }}
        />
      ))}
    <div className="wrap mb16">
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
