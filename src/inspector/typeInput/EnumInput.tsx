export default function EnumInput<T>({ sig, type }: { sig: Signal<TEnum<T>>; type?: string }) {
  return (
    <select
      className="w-full border-b border-zinc-400 accent-green-600"
      defaultValue={sig.value.selected as string}
      onChange={({ target }) => {
        sig.value.selected = type === `number` ? (Number(target.value) as any) : target.value
      }}
    >
      {sig.value.options.map((option) => (
        <option key={option as string} value={option as string}>
          {option as string}
        </option>
      ))}
    </select>
  )
}

export function Enum<T>(defvalue: T, ...options: T[]): TEnum<T> {
  return {
    type: `enum`,
    options,
    selected: defvalue,
  }
}
