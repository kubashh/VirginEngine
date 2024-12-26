export const save = () => {
  const { files } = window

  const jsonData = JSON.stringify(files)
  console.log(files)
  console.log(jsonData)

  const htmlElement = document.createElement(`a`)
  // Ustawienie typu i kodowania
  htmlElement.href = `data:application/json;charset=utf-8,${encodeURIComponent(jsonData)}`
  htmlElement.download = `${files.config.gameName}.deathengine`
  htmlElement.click()
}