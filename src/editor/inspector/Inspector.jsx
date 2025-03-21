import { useState } from "react"
import { editor } from "../../lib/consts"
import { Header } from "../../lib/components"

const InspectorComponent = () => {
  const [element, setElement] = useState()

  editor.setInspector = setElement

  return element
}

export const Inspector = () => (
  <div id="inspector">
    <Header text="Inspenctor" />
    <div className="scroll" children={<InspectorComponent />} />
  </div>
)
