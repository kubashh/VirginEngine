import { setUp } from "../data"
import { initConfig } from "./config"
import { initFiles } from "./files"

export const init = () => {
  initConfig()
  initFiles()

  setUp.value = true
}