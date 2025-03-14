import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { App } from "./App"
import { config, files } from "./lib/consts"
import { openScene } from "./lib/utils"
import "./index.css"

{
  const setUp = () => {
    document.oncontextmenu = (event) => event.preventDefault()

    let scene = files
    let lastKey = ``
    for (const key of config.pathToMainScene.split(`.`).slice(1)) {
      scene = scene[key]
      lastKey = key
    }

    openScene(scene, lastKey)
  }

  setUp()
}

const root = createRoot(document.getElementsByTagName(`main`)[0])
root.render(
  <StrictMode>
    <App />
  </StrictMode>
)
