import { jsCode } from "./jsCode";

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
  </head>
  <body style="background-color: black; margin: 0; overflow: hidden">
    <canvas></canvas>
    <script>
      SCRIPT
    </script>
  </body>
</html>
`);

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

export class Build {
  author: string;
  description: string;
  gameName: string;
  config: BuildConfig;
  files: any;
  production: boolean;

  constructor(options: BuildOptions) {
    this.author = options.author;
    this.description = options.description;
    this.gameName = options.gameName;
    this.config = options.config;
    this.files = options.files;
    this.production = options.production !== false;
  }
}

export async function build(options: BuildOptions) {
  const build = new Build(options);
  if (options.production === undefined) options.production = true;
  return html
    .replaceAll(`AUTHOR`, options.author)
    .replaceAll(`DESCRIPTION`, options.description)
    .replaceAll(`GAME_NAME`, options.gameName)
    .replaceAll(`SCRIPT`, await jsCode(build));
}

export type BuildOptions = {
  author: string;
  description: string;
  gameName: string;
  config: BuildConfig;
  production?: boolean;
  files: any;
};

export type BuildConfig = {
  performanceInfo: `dev` | `yes` | `dev` | `no`;
  pathToMainScene: string;
  fullScreen?: boolean;
};
