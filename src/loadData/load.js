import { config, editor, files } from "../lib/consts"
import { createElement } from "../lib/utils"

const clearAssign = (old, obj) => {
  for (const key in old) {
    delete old[key]
  }

  for (const key in obj) {
    old[key] = obj[key]
  }
}

const setData = (data) => {
  clearAssign(config, data.config)
  clearAssign(files, data.files)

  editor.setUp = true
  editor.reload()
}

export const load = () =>
  createElement({
    name: `input`,
    type: `file`,
    accept: `.deathengine`,
    onchange: ({ target }) => {
      const [file] = target.files
      const reader = new FileReader()

      reader.onload = ({ target }) => {
        setData(JSON.parse(target.result))
      }

      reader.readAsText(file)
    },
    click: true
  })
