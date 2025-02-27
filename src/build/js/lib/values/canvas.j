const canvas = document.body.children[0]
const ctx = canvas.getContext(`2d`)

const setWidthHeightCanvas = () => {
  width = window.innerWidth
  height = window.innerHeight
  canvas.width = width
  canvas.height = height
}

window.addEventListener(`resize`, setWidthHeightCanvas)
setWidthHeightCanvas()
