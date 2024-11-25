import { config, editor, files, scenes } from "../../data"

const setData = (data) => {
  // Config
  for(const key in data.config) {
    config[key] = data.config[key]
  }

  // Files
  for(const key in data.files) {
    files[key] = data.files[key]
  }

  // Scenes
  for(const key in data.scenes) {
    scenes[key] = data.scenes[key]
  }

  editor.setUp = true
  editor.reload()
}

export const load = () => {
  const plikInput = document.createElement(`input`)
  plikInput.type = `file`
  plikInput.accept = `.deathengine`

  plikInput.addEventListener("change", function() {
    const file = this.files[0]
    const reader = new FileReader()

    reader.onload = (event) => {
      const jsonFile = event.target.result
      try {
        const data = JSON.parse(jsonFile)
        console.log(data)

        setData(data)
      } catch (error) {
        console.error('Błąd parsowania JSON:', error)
      }
    }

    reader.readAsText(file)
  })

  plikInput.click()
}