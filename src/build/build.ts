import { htmlCode } from "./htmlCode"
import { conf, testScene } from "../lib/consts"
import { downloadFile } from "../lib/util"

export function build() {
  downloadFile(`${conf.gameName}.html`, htmlCode(true))
}

export function test() {
  testScene.value = htmlCode()
}
