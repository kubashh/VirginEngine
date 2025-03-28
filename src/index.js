import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { App } from "./App"
import "./css/index.css"

document.oncontextmenu = (event) => event.preventDefault()

const root = createRoot(document.getElementsByTagName(`main`)[0])
root.render(
  <StrictMode>
    <App />
  </StrictMode>
)
