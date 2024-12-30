import { config } from "./config"
import { editor } from "./editor"
import { files } from "./files"
import "./index.css"

export const setUp = () => {
  if(window.editor) {
    return
  }

  document.addEventListener(`contextmenu`, (e) => {
    e.preventDefault()
  })

  window.config = config
  window.files =  files
  window.editor = editor

  window.onresize = () => {
    window.editor.width = window.innerWidth
    window.editor.height = window.innerHeight
    window.editor.reload()
  }
}