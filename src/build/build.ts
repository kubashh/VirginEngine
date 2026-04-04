import { config, files, testSceneSignal } from "../lib/consts";
import { downloadFile } from "../lib/util";
import { build } from "./core";

export async function buildProject() {
  downloadFile(`${config.gameName}.html`, await build(getBuildConfig(true)));
}

export async function test() {
  testSceneSignal.set(await build(getBuildConfig(false)));
}

function getBuildConfig(production: boolean) {
  const performanceInfo =
    config.performanceInfo.selected === `yes` || (!production && config.performanceInfo.selected === `dev`);

  return {
    ...config,
    performanceInfo,
    config,
    files,
    production,
  };
}
