const callUpdate = (obj) => {
  obj.update?.()

  for (const child of obj.getChilds()) {
    callUpdate(child)
  }
}

const update = () => {
  callUpdate(currentScene)

  // Clear events, not eventsHover
  for (const key in events) {
    delete events[key]
  }
}
