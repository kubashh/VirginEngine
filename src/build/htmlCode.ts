import { conf } from "../lib/consts"
import { jsCode } from "./jsCode"

function optymalizeHtml(text: string) {
  return text
    .replaceAll(`\n`, ` `)
    .replaceAll(/\s{2,}/g, ` `)
    .replaceAll(`> `, `>`)
    .replaceAll(` <`, `<`)
    .replaceAll(`; `, `;`)
    .replaceAll(` {`, `{`)
    .replaceAll(`{ `, `{`)
    .replaceAll(` "`, `"`)
    .replaceAll(`" `, `"`)
}

const html = optymalizeHtml(`
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8"/>
    <meta name="viewport" content="width=device-width,initial-scale=1.0"/>
    <meta name="author" content="AUTHOR"/>
    <meta name="description" content="DESCRIPTION"/>
    <meta name="keywords" content="GAME_NAME,AUTHOR"/>

    <title>GAME_NAME</title>

    <style>
      body {
        background-color:black;
        margin:0;
        border:0;
        user-select:none;
        width:100vw;
        height:100vh;
        overflow:hidden;
      }
    </style>
  </head>
  <body>
    <canvas></canvas>
    <script>
      SCRIPT
    </script>
  </body>
</html>
`)

export function htmlCode() {
  return html
    .replaceAll(`AUTHOR`, conf.author)
    .replaceAll(`DESCRIPTION`, conf.description)
    .replaceAll(`GAME_NAME`, conf.gameName)
    .replaceAll(`SCRIPT`, jsCode())
}
