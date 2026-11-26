import { buildJs } from "./jsCode";

// build project

export async function coreBuild(options: BuildOptions): Promise<string> {
  const buildObject = { ...options, scenes: {}, images: {}, audio: {} };

  const output: string = await (options.hydrate ? buildJs(buildObject) : buildHtml(buildObject));

  const outputSize: number = new TextEncoder().encode(output).length;
  if (options.hydrate) {
    console.log(`JS size: ${fmtSize(outputSize)}`);
  } else {
    const jsSlice = output.slice(
      output.indexOf(`<script>`) + `<script>`.length,
      output.indexOf(`</script>`),
    );
    const jsSize: number = new TextEncoder().encode(jsSlice).length;
    const htmlSize: number = outputSize - jsSize;
    console.log(
      `index.html: ${fmtSize(outputSize)}\nHTML        ${fmtSize(htmlSize)}\nJS          ${fmtSize(jsSize)}`,
    );
  }

  return output;
}

function fmtSize(n: number): string {
  return `${(n / 1000).toFixed(3)} kB`.padStart(12, ` `);
}

async function buildHtml(buildObject: BuildObject): Promise<string> {
  return [
    `<!doctype html>`,
    `<html lang="en">`,
    `<head>`,
    `<meta charset="UTF-8">`,
    `<meta name="viewport"content="width=device-width,initial-scale=1.0">`,
    `<meta name="author"content="${buildObject.author}">`,
    `<meta name="description"content="${buildObject.description}">`,

    `<title>${buildObject.gameName}</title>`,
    `</head>`,

    `<body style="background-color:black;margin:0;overflow:hidden">`,
    `<canvas id="canvas"></canvas>`,
    `<script>${await buildJs(buildObject)}</script>`,
    `</body>`,
    `</html>`,
  ].join(``);
}

export type BuildOptions = {
  author: string;
  description: string;
  gameName: string;
  performanceInfo: boolean;
  startingSceneName: string;
  fullScreen: boolean;

  production: boolean;
  hydrate: string;
  files: TObj<any>;
};

export type BuildObject = BuildOptions & {
  files: TObj<any>;
  scenes: TObj<any>;
  images: TObj<any>;
  audio: TObj<any>;
};
