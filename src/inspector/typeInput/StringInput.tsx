export default function StringInput({ sig }: { sig: deprecated_Signal<string> }) {
  return (
    <input
      type="text"
      className="w-full border-b border-zinc-400 accent-green-600"
      value={sig.value}
      onChange={({ target }) => (sig.value = target.value)}
    />
  );
}
