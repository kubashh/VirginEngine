import Header from "../components/Header"
import { inspector } from "../lib/consts"
import { editorOpctions } from "./editorOptions"

function InspectorComponent() {
  inspector.bind()
  return inspector.value
}

export default function Inspector() {
  return (
    <section className="inspector">
      <Header text="Inspenctor" {...editorOpctions} />
      <div children={<InspectorComponent />} />
    </section>
  )
}
