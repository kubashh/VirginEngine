import { useState } from "react"
import { editor } from "../../lib/consts"
import { Header } from "../../lib/components"
import { editorOpctions } from "./editorOptions"

const InspectorComponent = () => {
  const [element, setElement] = useState()
  editor.setInspector = setElement

  return element
}

export const Inspector = () => (
  <section className="inspector">
    <Header text="Inspenctor" {...editorOpctions} />
    <div children={<InspectorComponent />} />
  </section>
)
