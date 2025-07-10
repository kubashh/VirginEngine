import Header from "../components/Header"

function DocsContent() {
  return (
    <div className="p3 overflow-y-scroll select-text">
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
    <section className="row-span-2 grid grid-rows-[24px_1fr] w-(--width1) border-r-1 border-solid border-zinc-400">
      <Header text="Docs" />
      <DocsContent />
    </section>
  )
}
