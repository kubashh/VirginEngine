import { config, files, testSceneSignal } from "../lib/consts";
import { downloadFile } from "../lib/util";
import { build } from "./core";

export async function buildProject() {
  downloadFile(`${config.gameName}.html`, await build({ ...config, config, files }));
}

export async function test() {
  testSceneSignal.set(await build({ ...config, config, files, production: false }));
}
