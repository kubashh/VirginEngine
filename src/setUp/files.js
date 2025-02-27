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
      }
    }
  }
}
