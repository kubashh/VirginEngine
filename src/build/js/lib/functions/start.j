const setObjects = (object) => {
  if(object.transform) {
    object.transform = new Transform(object.transform)
  }
  for(const key in object) {
    if(isFirstUpperCase(key)) {
      object[key].start?.()
      setObjects(object[key])
    }
  }
}

const start = () => {
  loadScene(currentScene)
}