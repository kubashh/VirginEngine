import { isFirstUpperCase } from "./isFirstUpperCase"

export const isValidName = (name) => {
  const alphabet = `abcdefghijklmnoprqstuwxyz`
  const allowedNameChars = `${alphabet}0123456789_`

  if (!isFirstUpperCase(name)) {
    return false
  }

  for (let i = 1; i < name.length; i++) {
    if (!allowedNameChars.includes(name[i].toLowerCase())) {
      return false
    }
  }

  return true
}
