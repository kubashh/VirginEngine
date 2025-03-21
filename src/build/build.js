import { htmlCode } from "./htmlCode"
import { downloadFile } from "../lib/utils"
import { config, editor } from "../lib/consts"

export const build = () =>
  downloadFile(`${config.gameName}.html`, htmlCode(), true)

export const test = () => {
  editor.setScene(htmlCode())
  //const myWindow = window.open()
  //myWindow.document.write(htmlCode())
}
