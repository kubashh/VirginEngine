const callUpdate = (obj) => {
  obj.update?.()

  for (const child of obj.childs) {
    callUpdate(child)
  }
}

const update = () => {
  callUpdate(scene)

  // Clear events, not eventsHover
  for (const key in events) {
    delete events[key]
  }
}
