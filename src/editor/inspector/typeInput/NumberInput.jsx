import { useState } from "react"
import { numbers } from "../../../lib/consts"

export const NumberInput = ({ object, access }) => {
  const [currentNumber, setCurrentNumber] = useState(object[access])

  return (
    <input
      type="text"
      style={{ width: `100%` }}
      value={currentNumber}
      onChange={({ target: { value } }) => {
        let dot = false
        for (const char of value) {
          // Is includes allow chars
          if (!`${numbers}.`.includes(char)) return

          // Double dot check
          if (char === `.`) {
            if (dot) return
            dot = true
          }
        }

        let newNumber = Number(value) || 0
        let set = true
        if (value[value.length - 1] === `.`) {
          set = false
        } else {
          object[access] = newNumber
        }

        setCurrentNumber(set ? newNumber : value)
      }}
    />
  )
}
