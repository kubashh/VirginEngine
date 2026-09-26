import { useEffect, useRef } from "react";
import { InspectorSection } from "../../inspector/InspectorSection";
import { type TFile } from "../../lib/consts";
import { useRefresh } from "../../lib/hooks";

export function Script({ object, refresh }: ScriptProps) {
  return object.script ? (
    <InspectorSection
      text="Script"
      children={ScriptInput({
        object,
        access: `script`,
      })}
      onRemove={() => {
        delete object.script;
        refresh();
      }}
    />
  ) : null;
}

function ScriptInput({ object, access }: StringInputProps) {
  const ref = useRef<HTMLTextAreaElement>(null);
  const refresh = useRefresh();

  useEffect(refresh, [ref]);

  return (
    <textarea
      ref={ref}
      className="w-full resize-none"
      style={{ height: ref?.current?.scrollHeight }}
      value={object[access]}
      onChange={({ target }) => {
        object[access] = target.value;
        refresh();
      }}
    />
  );
}

type StringInputProps = {
  object: TFile;
  access: string;
};

type ScriptProps = {
  object: TFile;
  refresh: () => void;
};
