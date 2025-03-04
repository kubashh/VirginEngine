import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { App } from "./App"
import { editor, files } from "./lib/consts"
import { openScene } from "./lib/utils"
import "./index.css"

const setUp = () => {
  document.oncontextmenu = (event) => event.preventDefault()

  window.onresize = () => {
    editor.width = window.innerWidth
    editor.height = window.innerHeight
    editor.reload()
  }

  openScene(Object.keys(files.Scenes)[1])
}

setUp()

const root = createRoot(document.getElementById(`root`))
root.render(
  <StrictMode>
    <App />
  </StrictMode>
)
