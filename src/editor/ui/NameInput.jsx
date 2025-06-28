import { useEffect, useRef, useState } from "react"
import { capitalize, isValidName } from "../../lib/utils"
import { editor } from "../../lib/consts"

function useNameInput(ref) {
  const [[cb, text = ``, lowerCase = false], setNameInput] = useState([])

  editor.setNameInput = setNameInput

  const ret = () => {
    if (isValidName(text)) {
      cb(lowerCase ? `${text[0].toLowerCase()}${text.slice(1)}` : text)
    }
    setNameInput([])
  }

  useEffect(() => {
    function handler({ target }) {
      if (ref.current && !ref.current.contains(target)) ret()
    }

    document.addEventListener(`mousedown`, handler)

    return () => document.removeEventListener(`mousedown`, handler)
  })

  return {
    value: cb && text,
    onChange: ({ target }) => {
      let value = capitalize(target.value)

      if (!isValidName(value)) return

      setNameInput((prev) => [prev[0], value, prev[2]])
    },
    onKeyDown: ({ key }) => key === `Enter` && ret(),
  }
}

export default function NameInput() {
  const ref = useRef()
  const props = useNameInput(ref)

  return typeof props.value === `string` ? (
    <input type="text" ref={ref} className="zAbsolute fontSize36 translateCenter" {...props} autoFocus />
  ) : null
}
