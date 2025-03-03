export const optymalizeHtml = (text) => {
  let newText = ``

  let lastChar = ``
  for (const char of text) {
    if (
      ((lastChar === `>` || lastChar === ` `) && char === ` `) ||
      char === `\n`
    )
      continue

    newText += char
    lastChar = char
  }

  return newText
}
