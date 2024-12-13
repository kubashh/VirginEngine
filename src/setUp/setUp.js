import { config } from "./config"
import { editor } from "./editor"
import { files } from "./files"
import "./index.css"

export const setUp = () => {
  if(window.data) {
    return
  }

  document.addEventListener(`contextmenu`, (e) => {
    e.preventDefault()
  })

  window.data = { config, files, editor }

  window.onresize = () => {
    window.data.editor.width = window.innerWidth
    window.data.editor.height = window.innerHeight
    window.data.editor.reload()
  }
}