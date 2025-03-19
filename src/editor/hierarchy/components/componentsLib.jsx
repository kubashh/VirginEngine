import { editor } from "../../../lib/consts"
import { Rect } from "./Rect"
import { Script } from "./Script"
import { Text } from "./Text"
import { Transform } from "./Transform"

export const AddComponent = ({ text, onClick, style }) => (
  <input
    type="button"
    value={`+ ${text}`}
    style={{
      margin: `12px 0 0 24px`,
      padding: `6px 12px`,
      fontSize: 16,
      display: `block`,
      ...style
    }}
    onClick={onClick}
  />
)

export const setComponents = (props) => {
  const refresh = () => {
    setComponents(props)
  }

  props = { ...props, refresh }

  editor.setInspector(
    <>
      <h2 style={{ marginLeft: 12 }}>{props.name}</h2>
      <Transform {...props} />
      <Script {...props} />
      <Text {...props} />
      <Rect {...props} />
    </>
  )
}
