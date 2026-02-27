import { htmlCode } from "./htmlCode";
import { config, testScene } from "../lib/consts";
import { downloadFile } from "../lib/util";

export async function build() {
  downloadFile(`${config.gameName}.html`, await htmlCode(true));
}

export async function test() {
  testScene.value = await htmlCode();
}
