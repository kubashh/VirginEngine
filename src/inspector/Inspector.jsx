import { useState } from "react"
import Header from "../components/Header"
import { editor } from "../lib/consts"
import { editorOpctions } from "./editorOptions"

function InspectorComponent() {
  const [element, setElement] = useState()
  editor.setInspector = setElement

  return element
}

export default function Inspector() {
  return (
    <section className="inspector">
      <Header text="Inspenctor" {...editorOpctions} />
      <div children={<InspectorComponent />} />
    </section>
  )
}
