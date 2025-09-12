import InspectorSection from "../../inspector/InspectorSection"
import Script from "./Script"
import Transform from "./Transform"
import { inspector } from "../../lib/consts"
import { capitalize, deepCopy } from "../../lib/util"
import { useRefresh } from "../../lib/hooks"

const text = [[[`value`], [`color`]], { value: ``, color: `white` }, [`rect`], []]

// textBaseline = [`top`, `middle`, `bottom`]
// textAlign = [`left`, `center`, `right`]
const rect = [[[`x`], [`y`]], { x: 0, y: 0 }, [], [`text`]]

const sprite = [[[`color`], [`src`]], { color: ``, src: `files.Assets.BoxImage` }, [], []]

const components: Any = { text, rect, sprite }

function toChilds(object: Any, name: string, arr: any[]) {
  return arr.reduce(
    (prev, e) => [
      ...prev,
      {
        object: e.slice(0, -1).reduce((prev: Any, key: string) => prev[key], object[name]),
        access: e.at(-1),
      },
    ],
    []
  )
}

export function AddComponent({ text, onClick }: AddComponentProps) {
  return (
    <input
      type="button"
      value={`+ ${text}`}
      className="mt-3 mb-6 px-3 py-2 cursor-pointer hover"
      onClick={onClick}
    />
  )
}

function Component({ name, refresh, readOnly, ...props }: Any) {
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
      {...{ ...props, remove: !readOnly ? remove : undefined }}
    />
  ) : (
    <AddComponent
      text={capitalize(name)}
      onClick={() => {
        if (readOnly) return

        props.object[name] = deepCopy(components[name][1])
        for (const key of components[name][2]) {
          if (!props.object[key]) props.object[key] = deepCopy(components[key][1])
        }

        refresh()
      }}
    />
  )
}

function Components({ name, ...props }: Any) {
  const refresh = useRefresh()
  props = { ...props, refresh }

  return (
    <div key={JSON.stringify(props)}>
      <h2 className="ml-3 text-xl font-bold">{name}</h2>
      <Transform object={props.object} />
      {Object.keys(components).map((key) => (
        <Component {...props} key={key} name={key} />
      ))}
      <Script object={props.object} refresh={refresh} />
    </div>
  )
}

export function setComponents(props: Any) {
  inspector.value = <Components {...props} />
}
