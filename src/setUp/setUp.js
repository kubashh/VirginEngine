import "./index.css"

const setData = () => {
  if(window.data) {
    return
  }

  const config = {
    gameName: "Name of Game",
    screenWidth: 1600,
    screenHeight: 900,
    fullScreen: true,
    safeUnload: false,
    version: 0,
    author: "Your Name or Nick",
    description: "Write what game is"
  }

  const files = {
    type: "folder",
    engineAssets: {
      type: "folder",
      tempImage: {
        type: "image",
        value: {
          src: "data:image/png;base64",
          width: 1,
          height: 1
        },
      }
    },
    folder1: {
      type: "folder",
      object2: {
        type: "text",
        value: "str 2"
      },
      obj3: {
        type: "folder",
        obj4: {
          type: "text",
          value: "str 3"
        },
        obj5: {
          type: "text",
          value: "str 4"
        }
      }
    },
    folder2: {
      type: "folder",
      object2: {
        type: "text",
        value: "str 5"
      },
      obj2: {
        type: "folder",
        obj4: {
          type: "text",
          value: "str 5"
        },
        obj5: {
          type: "text",
          value: "str 8"
        }
      }
    }
  }

  const scenes = {}

  const editor = {
    width: window.innerWidth,
    height: window.innerHeight,
    selectedField: "none"
  }

  window.data = { config, files, scenes, editor }
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