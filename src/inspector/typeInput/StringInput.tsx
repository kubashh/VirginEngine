import { type Signal } from "wdwh";

export default function StringInput({ sig }: { sig: Signal<string> }) {
  const value = sig.use();
  return (
    <input
      type="text"
      className="w-full border-b border-zinc-400 accent-green-600"
      value={value}
      onChange={({ target }) => sig.set(target.value)}
    />
  );
}
