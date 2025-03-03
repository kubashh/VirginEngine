import { htmlCode } from "./html/htmlCode"
import { downloadFile } from "../lib/utils"

export const build = () => {
  console.log(`Building...`)

  downloadFile(`${window.config.gameName}.html`, htmlCode())
}

export const test = () => {
  const myWindow = window.open()
  myWindow.document.write(htmlCode())
}
