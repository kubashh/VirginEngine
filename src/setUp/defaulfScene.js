const DGO = () => {
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

export const defaultScene = {
  type: `scene`,
  Camera: {
    ...DGO(),
    camera: {
      width: 400,
      height: 300
    }
  },
  obj1: {
    ...DGO()
  },
  obj2: {
    ...DGO(),
    obj3: {
      ...DGO()
    },
    obj4: {
      ...DGO()
    }
  },
  obj5: {
    ...DGO()
  },
  obj6: {
    ...DGO()
  },
  obj7: {
    ...DGO(),
    obj8: {
      ...DGO()
    }
  },
}