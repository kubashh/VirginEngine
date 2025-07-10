import Header from "../components/Header"
import { inspector } from "../lib/consts"
import { editorOpctions } from "./editorOptions"

function InspectorComponent() {
  inspector.bind()
  return inspector.value
}

export default function Inspector() {
  return (
    <section className="row-span-2 w-(--width3) border-l-1 border-solid border-zinc-400 grid grid-rows-[24px_1fr]">
      <Header text="Inspenctor" {...editorOpctions} />
      <div className="overflow-y-scroll">
        <InspectorComponent />
      </div>
    </section>
  )
}
