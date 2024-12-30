export const isFirstUpperCase = (text) => {
  return typeof text === `string` && text.length > 0 && `ABCDEFGHIJKLMNOPRQSTUWXYZ`.includes(text[0])
}