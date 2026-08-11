import { useCreateSignal } from "wdwh";
import BooleanInput from "./typeInput/BooleanInput";
import NumberInput from "./typeInput/NumberInput";
import StringInput from "./typeInput/StringInput";
import EnumInput from "./typeInput/EnumInput";
import { camelToTitleCase, getType, zswitch } from "../lib/util";

export default function TypeInput({ object, access, type: defType }: TypeInputProps) {
  const sig = useCreateSignal(object[access], () => {
    object[access] = sig.get();
  });
  const type = defType || sig.get().type || getType(sig.get());

  return (
    <div className="w-full grid grid-cols-[auto_1fr] gap-3">
      <div className="flex gap-3">
        <span>{camelToTitleCase(access)}</span>
        <span className="text-green-500">: {type}</span>
        <span>=</span>
      </div>
      {zswitch(type, {
        boolean: () => <BooleanInput sig={sig} />,
        number: () => <NumberInput sig={sig} />,
        string: () => <StringInput sig={sig} />,
        array: () => null,
        object: () => null,
        function: () => null,
        enum: () => <EnumInput sig={sig} />,
      })}
    </div>
  );
}

type TypeInputProps = {
  object: TObj<any>;
  access: string;
  type?: VTypes;
};
