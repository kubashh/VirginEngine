export default function StringInput({ sig }: { sig: deprecated_Signal<string> }) {
  return (
    <input
      type="text"
      className="w-full border-b border-zinc-400 accent-green-600"
      value={sig.get()}
      onChange={({ target }) => sig.set(target.value)}
    />
  );
}
