import { type Signal } from "wdwh/signal";

export default function StringInput({ sig }: { sig: Signal<string> }) {
  return (
    <input
      type="text"
      className="w-full border-b border-zinc-400 accent-green-600"
      value={sig.value}
      onChange={({ target }) => (sig.value = target.value)}
    />
  );
}
