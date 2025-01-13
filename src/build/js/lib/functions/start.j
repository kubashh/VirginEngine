const setObjects = (object) => {
  for(const key in object) {
    if(isFirstUpperCase(key)) {
      object[key].start?.()
      setObjects(object[key])
    }
  }
}

const start = () => {
  setObjects(selectedScene)
}