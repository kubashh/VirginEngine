import { useRefresh } from "wdwh/hooks";
import { Button } from "wdwh/components";
import InspectorSection from "../../inspector/InspectorSection";
import Script from "./Script";
import Transform from "./Transform";
import { inspectorSignal } from "../../lib/consts";
import { capitalize, deepCopy } from "../../lib/util";
import { Enum } from "../../inspector/typeInput/EnumInput";

// to one object { deps: [], remove: [] }
// const text2 = {value: ``, color: }
const text: TComponent = [{ value: ``, color: `white` }, [`rect`]];
const rect = [{ x: Enum(0, -1, 0, 1), y: Enum(0, -1, 0, 1) }, [], [`text`]];
const sprite = [{ color: ``, path: `files.Assets.Images.BoxImage` }];
const physics = [{ gravity: true }];
const audio = [{ path: `` }];

const components: TObj<TComponent> = { text, rect, sprite, physics, audio } as any;

export function setComponents(props: TObj<any>) {
  inspectorSignal.set(<Components {...props} />);
}

function Components({ name, ...props }: TObj<any>) {
  const refresh = useRefresh();
  props = { ...props, refresh };

  return (
    <div key={JSON.stringify(props)}>
      <h2 className="ml-3 text-xl font-bold">{name}</h2>
      <Transform object={props.object} />
      {Object.keys(components).map((key) => (
        <Component {...props} key={key} name={key} />
      ))}
      <Script object={props.object} refresh={refresh} />
    </div>
  );
}

function Component({ name, refresh, required, ...props }: TObj<any>) {
  const remove = () => {
    if (components[name][2]) {
      for (const key of components[name][2]) {
        delete props.object[key];
      }
    }
    delete props.object[name];
    refresh();
  };

  const addComponent = () => {
    if (required) return;

    props.object[name] = deepCopy(components[name][0]);
    if (components[name][1]) {
      for (const key of components[name][1]) {
        if (!props.object[key]) props.object[key] = deepCopy(components[key][0]);
      }
    }

    refresh();
  };

  return props.object[name] ? (
    <InspectorSection
      key={name}
      text={capitalize(name)}
      childs={toChilds(props.object, name, components[name][0])}
      {...{ ...props, onRemove: !required ? remove : undefined }}
    />
  ) : (
    <AddComponent text={capitalize(name)} onClick={addComponent} />
  );
}

function toChilds(object: TObj<any>, name: string, obj: TObj<any>) {
  return Object.keys(obj).reduce(
    (prev, e) => [
      ...prev,
      {
        object: object[name],
        access: e,
      },
    ],
    [] as { object: TObj<any>; access: string }[],
  );
}

export function AddComponent({ text, onClick }: AddComponentProps) {
  return (
    <Button label={`+ ${text}`} className="mt-3 mb-6 px-3 py-2 hover:text-zinc-400" onClick={onClick} />
  );
}

type TComponent = [any, string[]?, string[]?];
//  {
//   deps?: string[];
//   remove?: string[];
//   [key: string]: any;
// };

type AddComponentProps = {
  text: string;
  onClick: Void;
};
