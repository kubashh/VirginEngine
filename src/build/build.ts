import { htmlCode } from "./htmlCode"
import { downloadFile } from "../lib/utils"
import { config, testScene } from "../lib/consts"

export function build() {
  downloadFile(`${config.gameName}.html`, htmlCode(), true)
}

export function test() {
  testScene.value = htmlCode()
}
