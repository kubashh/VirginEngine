import { openScene } from "../lib/openScene"
import { config } from "./config"
import { editor } from "./editor"
import { files } from "./files"
import "./index.css"

const setUpData = () => {
  window.config = config
  window.files =  files
  window.editor = editor
}

export const setUp = () => {
  if(window.editor) {
    return
  }

  document.addEventListener(`contextmenu`, (e) => e.preventDefault())

  setUpData()

  openScene(Object.keys(window.files.Scenes)[1])

  window.onresize = () => {
    window.editor.width = window.innerWidth
    window.editor.height = window.innerHeight
    window.editor.reload()
  }
}