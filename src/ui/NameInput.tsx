import { useEffect, useRef } from "react"
import { nameInput } from "../lib/consts"
import { capitalize, isValidName } from "../lib/utils"

function useNameInput(ref: React.Ref<HTMLInputElement | null>) {
  nameInput.bind()
  const [cb, text = ``, lowerCase = false] = nameInput.value

  const ret = () => {
    if (isValidName(text)) {
      // @ts-ignore
      cb(lowerCase ? `${text[0].toLowerCase()}${text.slice(1)}` : text)
    }
    nameInput.value = []
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

      nameInput.value = [cb, value, lowerCase]
    },
    onKeyDown: ({ key }: KeyboardEvent) => key === `Enter` && ret(),
  }
}

export default function NameInput() {
  const ref = useRef<HTMLInputElement | null>(null)
  const props = useNameInput(ref)

  return typeof props.value === `string` ? (
    // @ts-ignore
    <input ref={ref} type="text" className="absolute z-1 fontSize36 translateCenter" {...props} autoFocus />
  ) : null
}
