import { htmlCode } from "./htmlCode"
import { downloadFile } from "../lib/utils"
import { conf, testScene } from "../lib/consts"

export function build() {
  downloadFile(`${conf.gameName}.html`, htmlCode(), true)
}

export function test() {
  testScene.value = htmlCode()
}
