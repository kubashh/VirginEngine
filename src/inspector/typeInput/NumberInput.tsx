import { deprecated_useSignal } from "../../lib/deprecated_Signal";

export default function NumberInput({ sig }: { sig: deprecated_Signal<number> }) {
  const buf = deprecated_useSignal(String(sig.value));

  return (
    <input
      type="text"
      className="w-full border-b border-zinc-400 accent-green-600"
      value={buf.value}
      onChange={({ target: { value } }) => {
        let dot = false;
        for (const char of value) {
          // Is char allowed
          if (!/[0-9\-.]/.test(char)) return;

          // Double dot check
          if (char === `.`) {
            if (dot) return;
            dot = true;
          }
        }

        const num = value.slice(1).includes(`-`)
          ? -Number(`${value.at(0)}${value.slice(1).replaceAll(`-`, ``)}`)
          : Number(value);

        if (num || num === 0) {
          sig.value = num;
          buf.value = String(num);
          return;
        }

        buf.value = value;
      }}
    />
  );
}
