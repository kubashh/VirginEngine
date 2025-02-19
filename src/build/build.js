import { htmlCode } from "./html/htmlCode"
import { jsCode } from "./js/jsCode"

const getHtmlCode = () => htmlCode(jsCode())

export const build = () => {
  console.log(`Building...`)

  const htmlElement = document.createElement(`a`)
  // Ustawienie typu i kodowania
  htmlElement.href = `data:text/html;charset=utf-8,${encodeURIComponent(getHtmlCode())}`
  htmlElement.download = `${window.config.gameName}.html`
  htmlElement.click()
}

export const test = () => {
  const myWindow = window.open()
  myWindow.document.write(getHtmlCode())
}