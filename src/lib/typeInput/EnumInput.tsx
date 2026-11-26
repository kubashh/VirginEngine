import { type Signal } from "../signal";
import { useConst } from "../hooks";

export function EnumInput<T>({ sig }: { sig: Signal<TEnum<T>> }) {
  const isNumber = useConst(typeof sig.get().options[0] === `number`);
  return (
    <select
      className="w-full border-b border-zinc-400 accent-green-600"
      defaultValue={sig.get().selected as string} // do not need use, because select is automaticly updated by browser
      onChange={({ target }) => {
        sig.get().selected = (isNumber ? Number(target.value) : target.value) as T;
      }}
    >
      {sig.get().options.map((option) => (
        <option key={option as string} value={option as string}>
          {option as string}
        </option>
      ))}
    </select>
  );
}

export function Enum<T>(defaultValue: T, ...options: T[]): TEnum<T> {
  return {
    type: `enum`,
    options,
    selected: defaultValue,
  };
}

export type TEnum<T> = {
  type: `enum`;
  options: T[];
  selected: T;
};
