import { type Signal } from "@kubashh/signal"

export default function BooleanInput({ sig }: { sig: Signal<boolean> }) {
  return (
    <input
      type="checkbox"
      className="w-5 h-5 my-auto accent-green-600 cursor-pointer not-checked:opacity-20"
      checked={sig.value}
      onChange={({ target }) => (sig.value = target.checked)}
    />
  )
}
