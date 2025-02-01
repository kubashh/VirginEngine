export const isFirstUpperCase = (text) => 
  typeof text === `string` && `ABCDEFGHIJKLMNOPRQSTUWXYZ`.includes(text[0])