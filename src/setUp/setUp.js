import { config } from "./config"
import { editor } from "./editor"
import { files } from "./files"
import "./index.css"

const setWindowSize = () => {
  window.data.editor.width = window.innerWidth
  window.data.editor.height = window.innerHeight
  window.data.editor.reload()
}

const setUp = () => {
  if(window.data) {
    return
  }

  window.data = { config, files, editor }

  window.onresize = () => {
    setWindowSize()
  }
}

setUp()