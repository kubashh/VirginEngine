import { createRoot } from "react-dom/client"
import { App } from "./App"
import "./index.css"

document.oncontextmenu = (event) => event.preventDefault()

createRoot(document.getElementsByTagName(`main`)[0]).render(<App />)
