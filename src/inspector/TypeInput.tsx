import BooleanInput from "./typeInput/BooleanInput"
import NumberInput from "./typeInput/NumberInput"
import StringInput from "./typeInput/StringInput"
import { addSpaceBeforeUpper, getType } from "../lib/utils"
import { useRefresh } from "../lib/hooks"

function useElement(props: TypeInputProps) {
  const type: VTypes = props.type || getType(props.object[props.access])
  let element: React.ReactNode = null
  switch (type) {
    case "boolean":
      element = <BooleanInput {...props} />
      break
    case "number":
      element = <NumberInput {...props} />
      break
    case "string":
      element = <StringInput {...props} />
      break
    case "array":
      element = null
      break
    case "object":
      element = null
      break
    case "function":
      element = null
      break
    case `enum`:
      console.log(`ENUM`)
      break
    default:
      throw Error(`No such type!`)
  }

  return [element, type]
}

export default function TypeInput(props: TypeInputProps) {
  const refresh = useRefresh()
  const [element, type] = useElement({ ...props, refresh })

  return (
    <div className="w-full grid grid-cols-[auto_1fr] gap-3">
      <div className="flex gap-3">
        <span>{addSpaceBeforeUpper(props.access)}</span>
        <span className="text-green-500">: {type}</span>
        <span>=</span>
      </div>
      {element}
    </div>
  )
}
