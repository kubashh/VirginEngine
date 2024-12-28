export const isValidName = (name) => {
  const alphabet = `abcdefghijklmnoprqstuwxyz`
  const allowedNameChars = `${alphabet}0123456789_`

  if(!name || name.length === 0 || !alphabet.toUpperCase().includes(name[0])) {
    return false
  }

  for(let i = 0; i < name.length; i++) {
    if(!allowedNameChars.includes(name[i].toLowerCase())) {
      return false
    }
  }

  return true
}