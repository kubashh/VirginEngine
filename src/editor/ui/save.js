import { config, files } from "../../lib/consts"
import { downloadFile } from "../../lib/utils"

export const save = () =>
  downloadFile(
    `${config.gameName}.deathengine`,
    JSON.stringify({ config, files })
  )
