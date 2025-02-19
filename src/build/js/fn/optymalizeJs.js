export const optymalizeJs = (text) => text
  .replace(/\/\*[\s\S]*?\*\/|\/\/.*/g, ``) // Remove comments
  //.replace(`\n`, `;`)
  .split(`\n`) // Split into lines
  .map(line => line.trim()) // Trim lines
  .filter(line => line !== ``) // Remove empty lines
  //.map(line => line.replace(/\s*([({[])\s*/g, `$1`)) // Remove spaces before brackets
  .join(`\n`) // Join lines
  //.replace(/\s{2,}/g, ` `) // Replace multiple spaces with a single space

//console.log(optymalizeJs(`
//  const a = "34"
//  // data
//  /*
// fsklfjasfjsk
//
//
//
// 
//  */
//`))