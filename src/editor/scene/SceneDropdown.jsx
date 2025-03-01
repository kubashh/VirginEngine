import { useState } from "react"

export const SceneDropdown = ({ currentText, setAspectRatio, left }) => {
  const [show, setShow] = useState(false)

  const opctions = [`16 / 9`, `9 / 16`]

  return (
    <div
      style={{
        backgroundColor: `#333`,
        zIndex: 1,
        display: `flex`,
        flexDirection: `column`,
        width: 80,
        position: `absolute`,
        top: 0,
        left: left - 86
      }}
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
    >
      <input type="button" value={currentText} />
      {show &&
        opctions.map((value) => (
          <input
            type="button"
            key={value}
            value={value}
            onClick={() => {
              setAspectRatio(value)
            }}
          />
        ))}
    </div>
  )
}
