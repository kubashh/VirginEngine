export const downloadFile = (name, text, encode = false) => {
  const htmlElement = document.createElement(`a`)
  // Ustawienie typu i kodowania
  // encodeURIComponent(jsonData)
  htmlElement.href = `data:text;charset=utf-8,${encode ? encodeURIComponent(text) : text}`
  htmlElement.download = name
  htmlElement.click()
}