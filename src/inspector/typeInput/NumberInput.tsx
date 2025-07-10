import { numbers } from "../../lib/consts"
import { useSignal } from "../../lib/signals"

export default function NumberInput({ object, access }: StringInputProps) {
  const currentNumber = useSignal(object[access], () => (object[access] = currentNumber.value))

  return (
    <input
      type="text"
      className="inputText w-full"
      value={currentNumber.value}
      onChange={({ target: { value } }) => {
        let dot = false
        let min = false
        for (const char of value) {
          // Is includes allow chars
          if (!`${numbers}-.`.includes(char)) return

          // Double dot check
          if (char === `.`) {
            if (dot) return
            dot = true
          }
          // Double minus sign check
          if (char === `-`) {
            if (min) return
            min = true
          }
        }

        if (value.at(-1) === `.`) return

        currentNumber.value = Number(value) || 0
      }}
    />
  )
}
