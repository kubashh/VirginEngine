export const convertText = (text) => {
  text = text.toString()

  let newText = text[0].toUpperCase()

  for(const char of text.slice(1)) {
    if(char === char.toUpperCase()) {
      newText += ` `
    }

    newText += char
  }

  return newText
}