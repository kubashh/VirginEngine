export const editor = {
  width: window.innerWidth,
  height: window.innerHeight,
  selectedField: `none`,
  numbers: `0123456789`,
  allowedNameChars: `abcdefghijklmnoprstuwxyz0123456789_`,
  seletedScene: `defaultScene`,
  isValidName: (name) => {
    const allowedNameChars = `abcdefghijklmnoprstuwxyz0123456789_`
    const numbers = `0123456789`

    if(numbers.includes(name)) {
      return false
    }

    for(let i = 0; i < name.length; i++) {
      if(!allowedNameChars.includes(name.toLowerCase())) {
        return false
      }
    }

    return true
  },
  keywords: [
    `type`,
    `transform`,
    `position`,
    `rotation`,
    `scale`,
    `camera`
  ]
}