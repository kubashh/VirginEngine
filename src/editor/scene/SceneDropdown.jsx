import { useHover } from "../../lib/hooks"

export const SceneDropdown = ({ currentText, setAspectRatio }) => {
  const [isHover, hover] = useHover()

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
        left: `calc(55vw - 186px)`
      }}
      {...hover}
    >
      <input type="button" value={currentText} />
      {isHover &&
        opctions.map((value) => (
          <input
            type="button"
            key={value}
            value={value}
            onClick={() => setAspectRatio(value)}
          />
        ))}
    </div>
  )
}
