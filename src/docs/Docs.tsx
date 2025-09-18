import Window from "../components/Window"

function DocsContent() {
  return (
    <div className="p-0.75 overflow-y-scroll select-text">
      Coming soon!
      {/* <div className="mb-8">
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
    <Window name="Docs" className="row-span-2 w-(--w1) border-r-1 border-zinc-400">
      <DocsContent />
    </Window>
  )
}
