import { numbers } from "../../lib/consts"
import { useSignal } from "../../lib/signals"

export default function NumberInput({ object, access }: StringInputProps) {
  const currentNumber = useSignal(object[access], () => (object[access] = currentNumber.value))

  return (
    <input
      type="text"
      className="w-full border-b-1 border-solid border-zinc-400"
      value={currentNumber.value}
      onChange={({ target: { value } }) => {
        if (value.slice(1).includes(`-`)) return

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

        const num = Number(value)

        if (value.at(-1) === `.` || (!num && num !== 0)) return

        currentNumber.value = num
      }}
    />
  )
}
