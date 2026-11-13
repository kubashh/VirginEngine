import { useState } from "react";
import { type Signal } from "../framework";

export function NumberInput({ sig }: { sig: Signal<number> }) {
  const [buf, setBuf] = useState(String(sig.get()));

  return (
    <input
      type="text"
      className="w-full border-b border-zinc-400 accent-green-600"
      value={buf}
      onChange={({ target }) => {
        const allow = /^[0-9\-.]*$/;

        if (!allow.test(target.value)) {
          target.value = target.value
            .split(``)
            .filter((char) => allow.test(char))
            .join(``);
          return;
        }

        const value = target.value;

        // double dot check
        if (value.includes(`.`, value.indexOf(`.`) + 1)) {
          return;
        }

        // TODO if value ends with `.` wait (don't sasve)

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
