import { Header } from "../../lib/components"

function DocsContent() {
  return (
    <div className="p3">
      Coming soon!
      {/* <div style={{ marginBottom: 32 }}>
      <h1>JS</h1>
      <h2>Arrays</h2>
      <h3>Create</h3>
      <div>const arr = []</div>
      <div>const arr = [20, false, `foo`]</div>
      <h3>Methods (usefull)</h3>
      <div>map(callbackFn)</div>
      <div>arr.map((element) ={`>`} ...sth)</div>
    </div>
    <div>
      <h1>Virgin Engine</h1>
      <h2>types</h2>
    </div> */}
    </div>
  )
}

export default function Docs() {
  return (
    <section className="docs">
      <Header text="Docs" />
      <DocsContent />
    </section>
  )
}
