import { type Signal } from "wdwh";

export default function EnumInput<T>({ sig, type }: { sig: Signal<TEnum<T>>; type?: string }) {
  return (
    <select
      className="w-full border-b border-zinc-400 accent-green-600"
      defaultValue={sig.get().selected as string} // do not need use, because select is automaticly updated by browser
      onChange={({ target }) => {
        sig.get().selected = (type === `number` ? Number(target.value) : target.value) as T;
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

export function Enum<T>(defvalue: T, ...options: T[]): TEnum<T> {
  return {
    type: `enum`,
    options,
    selected: defvalue,
  };
}
