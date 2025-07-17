import BooleanInput from "./typeInput/BooleanInput"
import NumberInput from "./typeInput/NumberInput"
import StringInput from "./typeInput/StringInput"
import { addSpaceBeforeUpper, getType } from "../lib/utils"
import { useSignal, type Signal } from "@/lib/signals"

function useElement(type: VTypes, props: { sig: Signal<any> }) {
  switch (type) {
    case "boolean":
      return <BooleanInput {...props} />
    case "number":
      return <NumberInput {...props} />
    case "string":
      return <StringInput {...props} />
    case "array":
      return null
    case "object":
      return null
    case "function":
      return null
    case `enum`:
      return null
    default:
      throw Error(`No such type!`)
  }
}

export default function TypeInput({ object, access, type: defType }: TypeInputProps) {
  const sig = useSignal(object[access], () => (object[access] = sig.value))
  const type = defType || getType(sig.value)
  const element = useElement(type, { sig })

  return (
    <div className="w-full grid grid-cols-[auto_1fr] gap-3">
      <div className="flex gap-3">
        <span>{addSpaceBeforeUpper(access)}</span>
        <span className="text-green-500">: {type}</span>
        <span>=</span>
      </div>
      {element}
    </div>
  )
}
