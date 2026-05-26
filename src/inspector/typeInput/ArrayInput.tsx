import { type Signal } from "wdwh";

// TODO
export default function ArrayInput({ sig }: ArrayInputProps) {
  const value = sig.use();
  // Wrapper of inputs array
  return (
    <input
      type="text"
      className="w-full border-b border-zinc-400 accent-green-600"
      value={value}
      onChange={({ target }) => sig.set(target.value)}
    />
  );
}

type ArrayInputProps = {
  sig: Signal<string>;
};
