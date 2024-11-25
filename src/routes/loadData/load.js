import { config, editor, files, scenes } from "../../data"

const creanObj = (obj) => {
  for(const key in obj) {
    delete obj[key]
  }
}

const setData = (data) => {
  // Config
  creanObj(config)
  for(const key in data.config) {
    config[key] = data.config[key]
  }

  // Files
  creanObj(files)
  for(const key in data.files) {
    files[key] = data.files[key]
  }

  // Scenes
  creanObj(scenes)
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

    reader.onload = ({ target }) => {
      const jsonFile = target.result

      const data = JSON.parse(jsonFile)
      console.log(data)

      setData(data)
    }

    reader.readAsText(file)
  })

  plikInput.click()
}