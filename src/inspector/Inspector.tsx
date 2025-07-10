import Header from "../components/Header"
import { inspector } from "../lib/consts"
import { editorOpctions } from "./editorOptions"

function InspectorComponent() {
  inspector.bind()
  return inspector.value
}

export default function Inspector() {
  return (
    <section className="grid grid-rows-[24px_1fr] w-(--width3) row-span-2 border-l-1 border-solid border-zinc-400">
      <Header text="Inspenctor" {...editorOpctions} />
      <div className="overflow-y-scroll">
        <InspectorComponent />
      </div>
    </section>
  )
}
