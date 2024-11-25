import { Header } from "./Header"

export const Inspector = () => {
  return <div
    style={{
      backgroundColor: "black",
      gridColumn: "2 / span 1",
      gridRow: "1 / span 2"
    }}
  >
    <Header
      text="Inspectior"
    />
    Inspector
  </div>
}