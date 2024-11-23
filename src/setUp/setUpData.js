import { data } from "../data"

export const setUpData = () => {
  if(data.setUp) {
    alert(`Data already set`)
    return
  }

  data.setUp = true
}