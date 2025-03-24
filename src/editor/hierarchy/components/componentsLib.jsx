import { editor } from "../../../lib/consts"
import { useRefresh } from "../../../lib/hooks"
import { capitalize } from "../../../lib/utils"
import { Rect } from "./Rect"
import { Script } from "./Script"
import { Text } from "./Text"
import { Transform } from "./Transform"

const deepCopy = (obj) => JSON.parse(JSON.stringify(obj))

const components = {
  text: [{ value: `` }, [`rect`], []],
  rect: [{ x: 0, y: 0 }, [], [`text`]]
}

export const AddComponent = ({ text, onClick, style }) => (
  <input
    type="button"
    value={`+ ${text}`}
    className="block"
    style={{
      margin: `12px 0 0 24px`,
      padding: `6px 12px`,
      fontSize: 16,
      ...style
    }}
    onClick={onClick}
  />
)

const Component = ({ name, Comp, refresh, readOnly, ...props }) => {
  const remove = () => {
    for (const key of components[name][2]) {
      delete props.object[key]
    }
    delete props.object[name]
    refresh()
  }

  return props.object[name] ? (
    <Comp key={name} text={capitalize(name)} {...{ ...props, remove }} />
  ) : (
    <AddComponent
      text={capitalize(name)}
      onClick={() => {
        if (readOnly) return

        props.object[name] = deepCopy(components[name][0])
        for (const key of components[name][1]) {
          if (!props.object[key])
            props.object[key] = deepCopy(components[key][0])
        }

        refresh()
      }}
    />
  )
}

const Components = (props) => {
  const refresh = useRefresh()
  props = { ...props, refresh }

  return (
    <>
      <h2 style={{ marginLeft: 12 }}>{props.name}</h2>
      <Transform {...props} />
      <Component {...props} name="text" Comp={Text} />
      <Component {...props} name="rect" Comp={Rect} />
      <Script {...props} />
    </>
  )
}

export const setComponents = (props) => {
  editor.setInspector()
  setTimeout(() => editor.setInspector(<Components {...props} />))
}
