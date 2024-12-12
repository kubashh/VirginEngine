import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { setUp } from "./setUp/setUp"
import { App } from "./App"

setUp()

const root = createRoot(document.getElementById(`root`))
root.render(
  <StrictMode>
    <App />
  </StrictMode>
)