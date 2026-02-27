import { config } from "../lib/consts";
import { jsCode } from "./jsCode";

function minifyHtml(text: string) {
  return text
    .replaceAll(/\/\*[\s\S]*?\*\//g, ``) // Remove comments
    .replaceAll(`\n`, ` `)
    .replaceAll(/\s{2,}/g, ` `)
    .replaceAll(/ > | >|> /g, `>`)
    .replaceAll(/ < | <|< /g, `<`)
    .replaceAll(/ ; | ;|; /g, `;`)
    .replaceAll(/ { | {|{ /g, `{`)
    .replaceAll(/ } | }|} /g, `}`)
    .replaceAll(/ " | "|" /g, `"`)
    .replaceAll(/ , | ,|, /g, `,`);
}

const html = minifyHtml(`
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8"/>
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <meta name="author" content="AUTHOR"/>
    <meta name="description" content="DESCRIPTION"/>
    <meta name="keywords" content="GAME_NAME, AUTHOR"/>

    <title>GAME_NAME</title>

    <style>
      body {
        background-color:black;
        margin:0;
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
`);

export async function htmlCode(production?: boolean) {
  return html
    .replaceAll(`AUTHOR`, config.author)
    .replaceAll(`DESCRIPTION`, config.description)
    .replaceAll(`GAME_NAME`, config.gameName)
    .replaceAll(`SCRIPT`, await jsCode(production));
}
