import { Transform } from "./Transform"

export const Components = (props) => {
  return <div
    style={{
      margin: 12
    }}
  >
    <div
      style={{
        display: `flex`
      }}
    >
      <h2>GameObject</h2>
      <h2
        style={{
          cursor: `pointer`,
          marginLeft: 32
        }}
        onClick={() => {
          const { name, old, object } = props
          window.editor.setNameInput([name, (newText) => {
            if(name === newText) {
              return
            }

            if(old[newText]) {
              console.error(`Error`)
            } else {
              delete old[name]
              old[newText] = object
              window.editor.reloadHierarchy()
            }
          }])
        }}
      >
        {props.name}
      </h2>
    </div>
    <Transform {...props} />
  </div>
}