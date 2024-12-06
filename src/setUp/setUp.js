import "./index.css"

const setData = () => {
  if(window.data) {
    return
  }

  const data = {
    config: {
      gameName: "Name of Game",
      screenWidth: 1600,
      screenHeight: 900,
      fullScreen: true,
      safeUnload: false,
      version: 0,
      author: "Your Name or Nick",
      description: "Write what game is"
    },
  
    files: {},
    scenes: {},
    editor: {
      width: window.innerWidth,
      height: window.innerHeight,
      selectedField: "none"
    }
  }

  window.data = data
}

const setUp = () => {
  setData()

  window.onresize = () => {
    window.data.editor.width = window.innerWidth
    window.data.editor.height = window.innerHeight
    window.data.editor.reload()
  }
}

setUp()