export const save = () => {
  const { config, files } = window

  const newData = { config, files }
  console.log(newData)

  const jsonData = JSON.stringify(newData)
  console.log(jsonData)

  const htmlElement = document.createElement(`a`)
  // Ustawienie typu i kodowania
  htmlElement.href = `data:application/json;charset=utf-8,${encodeURIComponent(jsonData)}`
  htmlElement.download = `${config.gameName}.deathengine`
  htmlElement.click()
}