import { useRefresh } from "wdwh/hooks"
import InspectorSection from "../../inspector/InspectorSection"
import Script from "./Script"
import Transform from "./Transform"
import { inspector } from "../../lib/consts"
import { capitalize, deepCopy } from "../../lib/util"
import { Enum } from "../../inspector/typeInput/EnumInput"

const text = [{ value: ``, color: `white` }, [`rect`], []]
const rect = [{ x: Enum(0, -1, 0, 1), y: Enum(0, -1, 0, 1) }, [], [`text`]]
const sprite = [{ color: ``, path: `files.Assets.Images.BoxImage` }, [], []]
const physics = [{ gravity: true }, [], []]
const audio = [{ path: `` }, [], []]

const components: Obj<[Any, string[], string[]]> = { text, rect, sprite, physics, audio } as any

export function setComponents(props: Any) {
  inspector.value = <Components {...props} />
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

function Component({ name, refresh, required, ...props }: Any) {
  const remove = () => {
    for (const key of components[name][2]) {
      delete props.object[key]
    }
    delete props.object[name]
    refresh()
  }

  const addComponent = () => {
    if (required) return

    props.object[name] = deepCopy(components[name][0])
    for (const key of components[name][1]) {
      if (!props.object[key]) props.object[key] = deepCopy(components[key][0])
    }

    refresh()
  }

  return props.object[name] ? (
    <InspectorSection
      key={name}
      text={capitalize(name)}
      childs={toChilds(props.object, name, components[name][0])}
      {...{ ...props, remove: !required ? remove : undefined }}
    />
  ) : (
    <AddComponent text={capitalize(name)} onClick={addComponent} />
  )
}

function toChilds(object: Any, name: string, obj: Any) {
  return Object.keys(obj).reduce(
    (prev, e) => [
      ...prev,
      {
        object: object[name],
        access: e,
      },
    ],
    [] as { object: Any; access: string }[],
  )
}

export function AddComponent({ text, onClick }: AddComponentProps) {
  return (
    <input
      type="button"
      value={`+ ${text}`}
      className="mt-3 mb-6 px-3 py-2 cursor-pointer hover:text-zinc-400"
      onClick={onClick}
    />
  )
}
