import { htmlCode } from "./html/htmlCode"
import { jsCode } from "./js/jsCode"

export const build = () => {
  console.log(`Building...`)

  const js = jsCode()
  const htmlText = htmlCode(js)

  console.log(js)

  /*const htmlElement = document.createElement(`a`)
  // Ustawienie typu i kodowania
  htmlElement.href = `data:text/html;charset=utf-8,${htmlText}`
  htmlElement.download = `${window.config.gameName}.html`
  htmlElement.click()*/

  const myWindow = window.open()
  myWindow.document.write(htmlText)
}