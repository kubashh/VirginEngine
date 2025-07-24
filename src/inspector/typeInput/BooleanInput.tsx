import clsx from "clsx"
import { type Signal } from "@/lib/signals"

export default function BooleanInput({ sig }: { sig: Signal<boolean> }) {
  return (
    <input
      type="checkbox"
      className={clsx(`w-5 h-5 my-auto accent-green-600 cursor-pointer`, !sig.value && `opacity-20`)}
      checked={sig.value}
      onChange={({ target }) => (sig.value = target.checked)}
    />
  )
}
