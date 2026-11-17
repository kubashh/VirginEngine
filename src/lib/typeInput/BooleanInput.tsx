import { type Signal } from "../framework";

export function BooleanInput({ sig }: { sig: Signal<boolean> }) {
  return (
    <input
      type="checkbox"
      className="my-auto h-5 w-5 cursor-pointer accent-green-600 not-checked:opacity-20"
      defaultChecked={sig.get()} // do not need use, because checkbox is automaticly updated
      onChange={({ target }) => sig.set(target.checked)}
    />
  );
}
