export const files = {
  type: `folder`,
  scenes: {
    type: `folder`,
    scene1: {
      type: `scene`,
      obj1: {
        type: `gameObject`
      },
      obj2: {
        type: `gameObject`,
        obj4: {
          type: `gameObject`
        },
        obj10: {
          type: `gameObject`
        }
      },
      obj3: {
        type: `gameObject`
      },
      obj4: {
        type: `gameObject`
      },
      obj5: {
        type: `gameObject`,
        obj4: {
          type: `gameObject`
        }
      },
    }
  },
  engineAssets: {
    type: `folder`,
    tempImage: {
      type: `image`,
      value: {
        src: `data:image/png;base64`,
        width: 1,
        height: 1
      },
    }
  },
  folder1: {
    type: `folder`,
    object2: {
      type: `text`,
      value: `str 2`
    },
    obj3: {
      type: `folder`,
      obj4: {
        type: `text`,
        value: `str 3`
      },
      obj5: {
        type: `text`,
        value: `str 4`
      }
    }
  },
  folder2: {
    type: `folder`,
    object2: {
      type: `text`,
      value: `str 5`
    },
    obj2: {
      type: `folder`,
      obj4: {
        type: `text`,
        value: `str 5`
      },
      obj5: {
        type: `text`,
        value: `str 8`
      }
    }
  }
}