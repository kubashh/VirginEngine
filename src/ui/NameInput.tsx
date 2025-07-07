import { useEffect, useRef, useState } from "react"
import { editor } from "../lib/consts"
import { capitalize, isValidName } from "../lib/utils"

function useNameInput(ref: React.Ref<HTMLInputElement | null>) {
  const [[cb, text = ``, lowerCase = false], setNameInput] = useState<any[]>([])

  editor.setNameInput = setNameInput

  const ret = () => {
    if (isValidName(text)) {
      cb(lowerCase ? `${text[0].toLowerCase()}${text.slice(1)}` : text)
    }
    setNameInput([])
  }

  useEffect(() => {
    if (!ref) return

    function handler({ target }: MouseEvent) {
      // @ts-ignore
      if (ref?.current && !ref.current.contains(target)) ret()
    }

    document.addEventListener(`mousedown`, handler)

    return () => document.removeEventListener(`mousedown`, handler)
  })

  return {
    value: cb && text,
    onChange: ({ target }: { target: { value: string } }) => {
      const value = capitalize(target.value)

      if (!isValidName(value)) return

      setNameInput((prev) => [prev[0], value, prev[2]])
    },
    onKeyDown: ({ key }: KeyboardEvent) => key === `Enter` && ret(),
  }
}

export default function NameInput() {
  const ref = useRef<HTMLInputElement | null>(null)
  const props = useNameInput(ref)

  return typeof props.value === `string` ? (
    // @ts-ignore
    <input ref={ref} type="text" className="zAbsolute fontSize36 translateCenter" {...props} autoFocus />
  ) : null
}
