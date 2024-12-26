import { htmlCode } from "./htmlCode"

export const build = () => {
  console.log(`Build`)

  const htmlText = htmlCode()

  const htmlElement = document.createElement(`a`)
  // Ustawienie typu i kodowania
  htmlElement.href = `data:text/html;charset=utf-8,${htmlText}`
  htmlElement.download = `${window.files.config.gameName}.html`
  htmlElement.click()

  console.log(htmlText)
  const myWindow = window.open()
  myWindow.document.write(htmlText)
}