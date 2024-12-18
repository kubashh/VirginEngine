const cleanObj = (obj) => {
  for(const key in obj) {
    delete obj[key]
  }
}

const setData = (data) => {
  const { config, editor, files } = window

  // Config
  cleanObj(config)
  for(const key in data.config) {
    config[key] = data.config[key]
  }

  // Files
  cleanObj(files)
  for(const key in data.files) {
    files[key] = data.files[key]
  }

  editor.setUp = true
  editor.reload()
}

export const load = () => {
  const plikInput = document.createElement(`input`)
  plikInput.type = `file`
  plikInput.accept = `.deathengine`

  plikInput.addEventListener(`change`, ({ target }) => {
    const [file] = target.files
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