import { Transform } from "./Transform"

export const Components = (props) => {
  return <div>
    <div>
      <h2
        style={{
          marginLeft: 12
        }}
      >
        {`${props.name} (GameObject)`}
      </h2>
    </div>
    <Transform {...props} />
  </div>
}