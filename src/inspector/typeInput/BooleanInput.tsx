import { type Signal } from "wdwh";

export default function BooleanInput({ sig }: { sig: Signal<boolean> }) {
  return (
    <input
      type="checkbox"
      className="w-5 h-5 my-auto accent-green-600 cursor-pointer not-checked:opacity-20"
      defaultChecked={sig.get()} // do not need use, because checkbox is automaticly updated
      onChange={({ target }) => sig.set(target.checked)}
    />
  );
}
