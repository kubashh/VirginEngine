import { useEffect, useRef } from "react"
import { useConst, useRefresh } from "wdwh/hooks"
import InspectorSection from "../../inspector/InspectorSection"
import TypeInput from "../../inspector/TypeInput"
import { nameInput } from "../../lib/consts"
import { capitalize, getType, isCustomProp, isOccupied } from "../../lib/util"
import { AddComponent } from "./componentsLib"

function AdvancedInput({ object, access }: StringInputProps) {
  const type = useConst(getType(object[access]))

  return (
    <div className="flex flex-col">
      <div className="flex gap-3">
        <div>{access}</div>
        <div className="text-green-500">: {type}</div>
        <div>=</div>
        {/* <div>{scriptTypes[type][2]}</div> */}
      </div>
      <InputDefault object={object} access={access} />
      {/* <div>{scriptTypes[type].at(-1)}</div> */}
    </div>
  )
}

function InputDefault({ object, access }: StringInputProps) {
  const ref = useRef<HTMLTextAreaElement>(null)
  const refresh = useRefresh()

  useEffect(refresh, [ref])

  return (
    <textarea
      ref={ref}
      className="w-full resize-none"
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
const scriptTypes: Any = {
  boolean: [false, TypeInput],
  number: [0, TypeInput],
  string: [`""`, TypeInput],
  array: [`[]`, AdvancedInput, `[`, `]`],
  object: [`{}`, AdvancedInput, `{`, `}`],
  function: [`function() {}`, AdvancedInput, `function(`, `) {`, `}`],
}

// Add script component
function AddScript({ object, value, refresh }: AddScriptProps) {
  return (
    <AddComponent
      text={capitalize(value)}
      onClick={() =>
        (nameInput.value = [
          (text: string) => {
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
}

export default function Script({ object, refresh }: ScriptProps) {
  return (
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
      <div className="mb-4 flex flex-wrap">
        {Object.keys(scriptTypes).map((value) => (
          <AddScript key={value} value={value} object={object} refresh={refresh} />
        ))}
      </div>
    </>
  )
}
