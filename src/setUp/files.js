import { config } from "./config"
import { DefaultScene } from "./DefaulfScene"
import { Assets } from "./Assets"

export const files = {
  type: `folder`,
  Scenes: {
    type: `folder`,
    DefaultScene
  },
  Assets,
  Folder1: {
    type: `folder`,
    Obj1: {
      type: `text`,
      value: `str 2`
    },
    Obj2: {
      type: `folder`,
      Obj3: {
        type: `text`,
        value: `str 3`
      },
      Obj4: {
        type: `text`,
        value: `str 4`
      }
    }
  },
  Folder2: {
    type: `folder`,
    Obj5: {
      type: `text`,
      value: `str 5`
    },
    Obj6: {
      type: `folder`,
      Obj7: {
        type: `text`,
        value: `str 5`
      },
      Obj8: {
        type: `text`,
        value: `str 8`
      }
    }
  },
  config
}