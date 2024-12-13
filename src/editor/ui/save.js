export const save = () => {
  const { config, files } = window.data

  const toSave = {
    config,
    files
  }

  const jsonData = JSON.stringify(toSave)
  console.log(toSave)
  console.log(jsonData)

  const htmlElement = document.createElement(`a`)
  // Ustawienie typu i kodowania
  htmlElement.href = `data:application/json;charset=utf-8,${encodeURIComponent(jsonData)}`
  htmlElement.download = `${config.gameName}.deathengine`
  htmlElement.click()
}