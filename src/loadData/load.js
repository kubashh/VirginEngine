const setData = (data) => {
  console.log(data)

  const { config, editor, files } = window

  // Clean Config
  for(const key in config) {
    delete files[key]
  }

  // Clean Object
  for(const key in files) {
    delete files[key]
  }

  // Files
  for(const key in data.files) {
    files[key] = data.files[key]
  }

  // Config
  window.config = data.config

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

    reader.onload = ({ target: { result } }) => {
      setData(JSON.parse(result))
    }

    reader.readAsText(file)
  })

  plikInput.click()
}