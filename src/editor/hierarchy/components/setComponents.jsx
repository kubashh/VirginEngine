import { editor } from "../../../lib/consts"
import { Script } from "./Script"
import { Transform } from "./Transform"

export const setComponents = (props) => {
  editor.setInspector(
    <>
      <div>
        <h2 style={{ marginLeft: 12 }}>{props.name}</h2>
      </div>
      <Transform {...props} />
      <Script {...props} />
    </>
  )
}
