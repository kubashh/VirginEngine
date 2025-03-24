import { useRefresh } from "../../lib/hooks"
import { addSpaceBeforeUpper, getType } from "../../lib/utils"
import { BoolInput } from "./typeInput/BoolInput"
import { NumberInput } from "./typeInput/NumberInput"
import { StringInput } from "./typeInput/StringInput"

export const TypeInput = (props) => {
  const refresh = useRefresh()
  props = { ...props, refresh }

  let element
  const type = getType(props.object[props.access])
  switch (type) {
    case "bool":
      element = <BoolInput {...props} />
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
    default:
      console.error(`Type Error!`)
      break
  }

  return (
    <div
      style={{
        display: `grid`,
        gridTemplateColumns: `auto 1fr`,
        gap: 12,
        width: `calc(100% - 12px)`
      }}
    >
      <div className="flex" style={{ gap: 12 }}>
        <h4>{addSpaceBeforeUpper(props.access)}</h4>
        <h4 style={{ color: `green` }}>: {type}</h4>
        <h4>=</h4>
      </div>
      <div>{element}</div>
    </div>
  )
}
