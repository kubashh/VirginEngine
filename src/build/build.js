import { htmlCode } from "./html/htmlCode"
import { jsCode } from "./js/jsCode"
import { downloadFile } from "../lib/downloadFile"

const getHtmlCode = () => htmlCode(jsCode())

export const build = () => {
  console.log(`Building...`)

  downloadFile(`${window.config.gameName}.html`, getHtmlCode())
}

export const test = () => {
  const myWindow = window.open()
  myWindow.document.write(getHtmlCode())
}