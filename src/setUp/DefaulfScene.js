export const DGO = () => {
  return {
    type: `gameObject`,
    transform: {
      position: {
        x: 0,
        y: 0
      },
      rotation: {
        z: 0
      },
      scale: {
        x: 1,
        y: 1
      }
    }
  }
}

export const DefaultScene = {
  type: `scene`,
  Camera: {
    ...DGO(),
    camera: {
      width: 400,
      height: 300
    }
  },
  Obj1: {
    ...DGO()
  }
}
