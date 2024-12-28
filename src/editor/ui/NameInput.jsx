import { useEffect, useRef, useState } from "react"
import { isValidName } from "../../lib/isValidName"

export const NameInput = () => {
  const [[text, cb], setNameInput] = useState([])
  const ref = useRef()

  const ret = () => {
    if(text !== ``) {
      cb(text)
    }
    setNameInput([])
  }

  // eslint-disable-next-line
  useEffect(() => {
    window.editor.setNameInput = setNameInput
  
    const handler = ({ target }) => {
      if(ref.current) {
        if(!ref.current.contains(target)) {
          ret()
        }
      }
    }

    document.addEventListener(`mousedown`, handler)

    return () => {
      document.removeEventListener(`mousedown`, handler)
    }
  })

  return cb ? <input
    type="text"
    ref={ref}
    autoFocus
    style={{
      position: `absolute`,
      left: `50vw`,
      top: `50vh`,
      transform: `translate(-50%, -50%)`,
      fontSize: 40
    }}
    value={text}
    onChange={({ target }) => {
      const { value } = target

      if(!isValidName(value)) {
        return
      }

      setNameInput([value, cb])
    }}
    onKeyDown={({ key }) => {
      if(key === `Enter`) {
        ret()
      }
    }}
  /> : <div />
}