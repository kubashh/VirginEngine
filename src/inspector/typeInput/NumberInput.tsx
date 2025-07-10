import { numbers } from "../../lib/consts"
import { useSignal } from "../../lib/Signal"

export default function NumberInput({ object, access }: StringInputProps) {
  const currentNumber = useSignal(object[access])

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
          if (!`-${numbers}.`.includes(char)) return

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

        let newNumber = Number(value) || 0
        let set = true
        if (value[value.length - 1] === `.`) {
          set = false
        } else {
          object[access] = newNumber
        }

        currentNumber.value = set ? newNumber : value
      }}
    />
  )
}
