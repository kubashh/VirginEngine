const wait = async (time) => await new Promise(r => setTimeout(r, time))
const wait0 = async () => new Promise(r => setTimeout(r))

const now = () => window.performance.now()

const isFirstUpperCase = (text) => `ABCDEFGHIJKLMNOPRQSTUWXYZ`.includes(text[0])

const deepCopy = (data) => JSON.parse(JSON.stringify(data))

const classes = {
  "transform": Transform
}

const loadScene = (scene) => {
  const setUpScene = (element) => {
    for(const key in element) {
      if(isFirstUpperCase(key)) {
        setUpScene(element[key])
      } else if(classes[key]) {
        element[key] = new classes[key](element[key])
      }
    }
  }

  currentScene = deepCopy(scene)
  setUpScene(currentScene)
}