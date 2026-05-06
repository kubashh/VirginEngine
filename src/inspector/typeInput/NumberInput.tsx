import { useState } from "react";
import { type Signal } from "wdwh";
import { TextInput } from "wdwh/components";

export default function NumberInput({ sig }: { sig: Signal<number> }) {
  const [buf, setBuf] = useState(String(sig.get()));

  return (
    <TextInput
      className="w-full border-b border-zinc-400 accent-green-600"
      value={buf}
      allow={/^[0-9\-.]*$/}
      onChange={(value) => {
        // Double dot check
        if (value.includes(`.`, value.indexOf(`.`) + 1)) {
          return;
        }

        // TODO if value ends with `.` wait (do not pressed)

        const num = value.slice(1).includes(`-`)
          ? -Number(`${value.at(0)}${value.slice(1).replaceAll(`-`, ``)}`)
          : Number(value);

        if (num || num === 0) {
          sig.set(num);
          setBuf(String(num));
          return;
        }

        setBuf(value);
      }}
    />
  );
}
