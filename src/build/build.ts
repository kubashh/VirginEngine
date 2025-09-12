import { htmlCode } from "./htmlCode"
import { config, testScene } from "../lib/consts"
import { downloadFile } from "../lib/util"

export function build() {
  downloadFile(`${config.gameName}.html`, htmlCode(true))
}

export function test() {
  testScene.value = htmlCode()
}
