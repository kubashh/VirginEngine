export const downloadFile = (name, text) => {
  const htmlElement = document.createElement(`a`)
  // Ustawienie typu i kodowania
  // encodeURIComponent(jsonData)
  htmlElement.href = `data:text/html;charset=utf-8,${text}`
  htmlElement.download = name
  htmlElement.click()
}