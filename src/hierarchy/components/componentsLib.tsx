import InspectorSection from "../../inspector/InspectorSection"
import Script from "./Script"
import Transform from "./Transform"
import { inspector } from "../../lib/consts"
import { capitalize, deepCopy } from "../../lib/utils"
import { useRefresh } from "../../lib/hooks"

const text = [[[`value`]], { value: `` }, [`rect`], []]

// textBaseline = [`top`, `middle`, `bottom`]
// textAlign = [`left`, `center`, `right`]
const rect = [[[`x`], [`y`]], { x: 0, y: 0 }, [], [`text`]]

const sprite = [[[`color`], [`imagePath`]], { color: ``, imagePath: `` }, [], []]

const components: Obj = { text, rect, sprite }

function toChilds(object: Obj, name: string, arr: any[]) {
  return arr.reduce(
    (prev, e) => [
      ...prev,
      {
        object: e.slice(0, -1).reduce((prev: Obj, key: string) => prev[key], object[name]),
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
      className="mt-3 mb-6 px-3 py-2 hover cursor-pointer"
      onClick={onClick}
    />
  )
}

function Component({ name, refresh, readOnly, ...props }: Obj) {
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

function Components({ name, ...props }: Obj) {
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

export function setComponents(props: Obj) {
  inspector.value = <Components {...props} />
}
