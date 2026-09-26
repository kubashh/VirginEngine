import { Button } from "../../components/components";
import { InspectorSection } from "../../inspector/InspectorSection";
import { Script } from "./Script";
import { Transform } from "./Transform";
import { Enum } from "../../inspector/typeInput/EnumInput";
import { inspectorSignal, type TFile } from "../../lib/consts";
import { capitalize, deepCopy } from "../../lib/util";
import { useRefresh } from "../../lib/hooks";

const rect: TComponent = { initValue: { x: Enum(0, -1, 0, 1), y: Enum(0, -1, 0, 1) }, remove: [`text`] };
const text: TComponent = { initValue: { value: ``, color: `white` }, deps: [`rect`] };
const sprite: TComponent = { initValue: { color: ``, path: `files.Assets.Images.BoxImage` } };
const physics: TComponent = { initValue: { gravity: true } };
const audio: TComponent = { initValue: { path: `` } };
const script: TComponent = { initValue: `class MyScript {\n}\n` };

const components: TObj<TComponent> = { rect, text, sprite, physics, audio, script };

export function setComponents(props: ComponentsProps) {
  inspectorSignal.set(<Components {...props} />);
}

function Components(props: ComponentsProps) {
  const refresh = useRefresh();

  return (
    <div key={JSON.stringify(props)}>
      <h2 className="ml-3 text-xl font-bold">{props.name}</h2>
      <Transform transform={props.object.transform} />
      {Object.keys(components)
        .toSorted((a, b) => Number(!!props.object[b]) - Number(!!props.object[a]))
        .map((key) => (
          <Component refresh={refresh} {...props} key={key} name={key} />
        ))}
    </div>
  );
}

function Component({ name, refresh, required, ...props }: ComponentProps) {
  const remove = () => {
    if (components[name].remove) {
      for (const key of components[name].remove) {
        delete props.object[key];
      }
    }
    delete props.object[name];
    refresh();
  };

  const addComponent = () => {
    if (required) return;

    props.object[name] = deepCopy(components[name].initValue);
    if (components[name].deps) {
      for (const key of components[name].deps) {
        if (!props.object[key]) props.object[key] = deepCopy(components[key].initValue);
      }
    }

    refresh();
  };

  return props.object[name] ? (
    typeof components[name].initValue === `string` ? (
      <Script object={props.object} refresh={refresh} />
    ) : (
      <InspectorSection
        key={name}
        text={capitalize(name)}
        childs={toChilds(props.object, name, components[name].initValue)}
        {...{ ...props, onRemove: !required ? remove : undefined }}
      />
    )
  ) : (
    <AddComponent text={capitalize(name)} onClick={addComponent} />
  );
}

function toChilds(object: TFile, name: string, obj: TObj<any>) {
  return Object.keys(obj).reduce(
    (prev, e) => [
      ...prev,
      {
        object: object[name],
        access: e,
      },
    ],
    [] as { object: TFile; access: string }[],
  );
}

function AddComponent({ text, onClick }: AddComponentProps) {
  return (
    <Button label={`+ ${text}`} className="mt-3 mb-6 px-3 py-2 hover:text-zinc-400" onClick={onClick} />
  );
}

type TComponent = {
  initValue: TObj<any> | string;
  deps?: string[];
  remove?: string[];
};

type AddComponentProps = {
  text: string;
  onClick: () => void;
};

type ComponentsProps = {
  name: string;
  parent: TFile;
  object: TFile;
};

type ComponentProps = {
  name: string;
  required?: boolean;
  refresh: () => void;
  parent: TFile;
  object: TFile;
};
