import { htmlCode } from "./htmlCode"
import { downloadFile } from "../lib/utils"
import { config, editor } from "../lib/consts"

export function build() {
  downloadFile(`${config.gameName}.html`, htmlCode(), true)
}

export function test() {
  console.clear()
  editor.setScene(htmlCode())
}
