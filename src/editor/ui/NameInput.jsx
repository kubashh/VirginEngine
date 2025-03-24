import { useEffect, useRef, useState } from "react"
import { capitalize, isValidName } from "../../lib/utils"
import { editor } from "../../lib/consts"

export const NameInput = () => {
  const ref = useRef()
  const [[cb, text = ``, lowerCase = false], setNameInput] = useState([])

  editor.setNameInput = setNameInput

  const ret = () => {
    if (isValidName(text)) {
      cb(lowerCase ? `${text[0].toLowerCase()}${text.slice(1)}` : text)
    }
    setNameInput([])
  }

  useEffect(() => {
    const handler = ({ target }) =>
      ref.current && !ref.current.contains(target) && ret()

    document.addEventListener(`mousedown`, handler)

    return () => document.removeEventListener(`mousedown`, handler)
  })

  return cb ? (
    <input
      type="text"
      ref={ref}
      className="absolute"
      style={{
        inset: `50vh auto auto 50vw`,
        transform: `translate(-50%, -50%)`,
        fontSize: 40
      }}
      value={text}
      onChange={({ target }) => {
        let value = capitalize(target.value)

        if (!isValidName(value)) return

        setNameInput((prev) => [prev[0], value, prev[2]])
      }}
      onKeyDown={({ key }) => key === `Enter` && ret()}
      autoFocus
    />
  ) : null
}
