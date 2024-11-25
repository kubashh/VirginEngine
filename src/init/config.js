import { config } from "../data"

const obj = {
  gameName: "Name of Game",
  screenWidth: 1600,
  screenHeight: 900,
  fullScreen: true,
  safeUnload: false,
  version: 0,
  author: "Your Name or Nick",
  description: "Write what game is"
}

export const initConfig = () => {
  for(const key in obj) {
    config[key] = obj[key]
  }
}