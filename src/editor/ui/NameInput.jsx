import { useEffect, useRef, useState } from "react"
import { isValidName } from "../../lib/utils"
import { editor } from "../../lib/consts"

export const NameInput = () => {
  const [[cb, text = ``, loverCase = false], setNameInput] = useState([])
  const ref = useRef()

  const ret = () => {
    if (isValidName(text)) {
      cb(loverCase ? `${text[0].toLowerCase()}${text.slice(1)}` : text)
    }
    setNameInput([])
  }

  useEffect(() => {
    editor.setNameInput = setNameInput

    const handler = ({ target }) =>
      ref.current && !ref.current.contains(target) && ret()

    document.addEventListener(`mousedown`, handler)

    return () => document.removeEventListener(`mousedown`, handler)

    // eslint-disable-next-line
  }, [text === ``])

  return cb ? (
    <input
      type="text"
      ref={ref}
      autoFocus
      style={{
        position: `absolute`,
        inset: `50vh auto auto 50vw`,
        transform: `translate(-50%, -50%)`,
        fontSize: 40
      }}
      value={text}
      onChange={({ target: { value } }) => {
        if (value.length > 0 && value[0] !== value[0].toUpperCase()) {
          value = `${value[0].toUpperCase()}${value.slice(1)}`
        }

        if (value.length !== 0 && !isValidName(value)) return

        setNameInput([cb, value, loverCase])
      }}
      onKeyDown={({ key }) => key === `Enter` && ret()}
    />
  ) : null
}
