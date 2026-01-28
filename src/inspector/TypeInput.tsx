import { type Signal, useSignal } from "@kubashh/signal"
import BooleanInput from "./typeInput/BooleanInput"
import NumberInput from "./typeInput/NumberInput"
import StringInput from "./typeInput/StringInput"
import EnumInput from "./typeInput/EnumInput"
import { addSpaceBeforeUpper, getType } from "../lib/util"

function useElement(type: VTypes, sig: Signal<any>) {
  switch (type) {
    case "boolean":
      return <BooleanInput sig={sig} />
    case "number":
      return <NumberInput sig={sig} />
    case "string":
      return <StringInput sig={sig} />
    case "array":
      return null
    case "object":
      return null
    case "function":
      return null
    case `enum`:
      return <EnumInput sig={sig} />
  }
}

export default function TypeInput({ object, access, type: defType }: TypeInputProps) {
  const sig = useSignal(object[access], () => (object[access] = sig.value))
  const type = defType || sig.value.type || getType(sig.value)
  const element = useElement(type, sig)

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
