export default function BooleanInput({ sig }: { sig: deprecated_Signal<boolean> }) {
  return (
    <input
      type="checkbox"
      className="w-5 h-5 my-auto accent-green-600 cursor-pointer not-checked:opacity-20"
      checked={sig.get()}
      onChange={({ target }) => sig.set(target.checked)}
    />
  );
}
