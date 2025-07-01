import { createRoot } from "react-dom/client"
import App from "./app/App"
import "./app/index.css"

document.oncontextmenu = (event) => event.preventDefault()

createRoot(document.getElementsByTagName(`body`)[0]).render(<App />)
