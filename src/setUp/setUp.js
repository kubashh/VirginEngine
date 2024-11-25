import { editor } from "../data"
import "./index.css"

const setUp = () => {
  window.onresize = () => {
    editor.width = window.innerWidth
    editor.height = window.innerHeight
    editor.reload()
  }
}

setUp()