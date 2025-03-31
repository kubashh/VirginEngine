import { editor } from "../../../lib/consts"
import { useRefresh } from "../../../lib/hooks"
import { capitalize } from "../../../lib/utils"
import { InspectorSection } from "../../inspector/InspectorSection"
import { Script } from "./Script"
import { Transform } from "./Transform"

const text = [[[`value`]], { value: `` }, [`rect`], []]

// textBaseline = [`top`, `middle`, `bottom`]
// textAlign = [`left`, `center`, `right`]
const rect = [[[`x`], [`y`]], { x: 0, y: 0 }, [], [`text`]]

const components = {
  text,
  rect
}

const toChilds = (object, name, arr) =>
  arr.reduce(
    (prev, e) => [
      ...prev,
      {
        object: e.slice(0, -1).reduce((prev, key) => prev[key], object[name]),
        access: e.at(-1)
      }
    ],
    []
  )

const deepCopy = (obj) => JSON.parse(JSON.stringify(obj))

export const AddComponent = ({ text, onClick }) => (
  <input
    type="button"
    value={`+ ${text}`}
    className="fontSize16 hover"
    style={{ margin: `12px 0 0 24px`, padding: `6px 12px` }}
    onClick={onClick}
  />
)

const Component = ({ name, refresh, readOnly, ...props }) => {
  const remove = () => {
    for (const key of components[name][3]) {
      delete props.object[key]
    }
    delete props.object[name]
    refresh()
  }

  return props.object[name] ? (
    <InspectorSection
      key={name}
      text={capitalize(name)}
      childs={toChilds(props.object, name, components[name][0])}
      {...{ ...props, remove: !readOnly && remove }}
    />
  ) : (
    <AddComponent
      text={capitalize(name)}
      onClick={() => {
        if (readOnly) return

        props.object[name] = deepCopy(components[name][1])
        for (const key of components[name][2]) {
          if (!props.object[key])
            props.object[key] = deepCopy(components[key][1])
        }

        refresh()
      }}
    />
  )
}

const Components = ({ name, ...props }) => {
  const refresh = useRefresh()
  props = { ...props, refresh }

  return (
    <div key={JSON.stringify(props)}>
      <h2 style={{ marginLeft: 12 }}>{name}</h2>
      <Transform {...props} />
      {Object.keys(components).map((key) => (
        <Component {...props} key={key} name={key} />
      ))}
      <Script {...props} />
    </div>
  )
}

export const setComponents = (props) => {
  editor.setInspector(<Components {...props} />)
}
