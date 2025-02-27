import { downloadFile } from "../../lib/downloadFile"

export const save = () => {
  const { config, files } = window

  const newData = { config, files }
  console.log(newData)

  const jsonData = JSON.stringify(newData)
  console.log(jsonData)

  downloadFile(`${config.gameName}.deathengine`, jsonData)
}
