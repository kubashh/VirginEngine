export const isFirstUpperCase = (text) => {
  const alphabet = `abcdefghijklmnoprqstuwxyz`.toUpperCase()

  return typeof text === `string` && text.length > 0 && alphabet.includes(text[0])
}