import { readFileSync, writeFileSync } from "fs"

// Optymalize JavaScript
function optymalizeJs(text: string) {
  return (
    text
      .replace(/\/\*[\s\S]*?\*\/|\/\/.*/g, ``) // Remove comments
      // .replace(`\n`, `;`)
      .split(`\n`) // Split into lines
      .map((line) => line.trim()) // Trim lines
      .filter((line) => line !== ``) // Remove empty lines
      // .map(line => line.replace(/\s*([({[])\s*/g, `$1`)) // Remove spaces before brackets
      .join(`\n`) // Join lines
  )
  // .replace(/\s{2,}/g, ` `) // Replace multiple spaces with a single space
}

function joinFiles(arr: (NonSharedBuffer | string)[]) {
  return arr.reduce((prev: string, s) => `${prev}${s}\n`, ``)
}

function encode(s: string) {
  const buf = []
  for (const e of s) {
    if (e === `\n`) buf.push(`\\`, `n`)
    else {
      if (e === `"`) buf.push(`\\`)
      buf.push(e)
    }
  }
  return buf.join(``)
}

// Static files
const files = optymalizeJs(
  joinFiles([
    // Values
    readFileSync("./src/values/values.js"),

    // Components
    readFileSync("./src/components/GameObject.js"),
    readFileSync("./src/components/Transform.js"),
    readFileSync("./src/components/Collider.js"),
    readFileSync("./src/components/Physics.js"),
    readFileSync("./src/components/Sprite.js"),
    readFileSync("./src/components/Animation.js"),
    readFileSync("./src/components/Text.js"),

    // Functions
    readFileSync("./src/functions/basicFunctions.js"),
    readFileSync("./src/functions/runUpdateRender.js"),

    // Run
    `
    loadScene(\`REPLACE_PATH_TO_MAIN_SCENE\`)
    run()
    //document.body.children[1].remove()`,
  ])
)

const jsFile = `export default "${encode(files)}"`

writeFileSync(`../src/build/core.js`, jsFile)
