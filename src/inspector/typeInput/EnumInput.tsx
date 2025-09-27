export default function EnumInput({ sig }: { sig: Signal<TEnum> }) {
  return (
    <select
      className="w-full border-b-1 border-zinc-400 accent-green-600"
      defaultValue={sig.value.selected}
      onChange={({ target }) => (sig.value.selected = target.value)}
    >
      {sig.value.options.map((option: string) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  )
}

export function Enum(...options: string[]): TEnum {
  return {
    type: `enum`,
    options,
    selected: options[0],
  }
}
