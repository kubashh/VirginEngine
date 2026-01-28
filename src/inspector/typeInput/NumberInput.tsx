import { type Signal, useSignal } from "@kubashh/signal"
import { numbers } from "../../lib/consts"

export default function NumberInput({ sig }: { sig: Signal<number> }) {
  const buf = useSignal(String(sig.value))

  return (
    <input
      type="text"
      className="w-full border-b border-zinc-400 accent-green-600"
      value={buf.value}
      onChange={({ target: { value } }) => {
        let dot = false
        for (const char of value) {
          // Is includes allow chars
          if (!`${numbers}-.`.includes(char)) return

          // Double dot check
          if (char === `.`) {
            if (dot) return
            dot = true
          }
        }

        const num = value.slice(1).includes(`-`)
          ? -Number(`${value.at(0)}${value.slice(1).replaceAll(`-`, ``)}`)
          : Number(value)

        if (num || num === 0) {
          sig.value = num
          buf.value = String(num)
          return
        }

        buf.value = value
      }}
    />
  )
}
