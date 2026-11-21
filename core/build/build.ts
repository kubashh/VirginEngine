import { buildJs } from "./jsCode";

declare const REPLACE_HTML_TEMPLATE: string;

// build project

export function build(options: BuildOptions): Promise<string> {
  return Build.build(options);
}

export class Build {
  static author: string;
  static description: string;
  static gameName: string;
  static performanceInfo: boolean;
  static startingSceneName: string;
  static fullScreen: boolean;

  static production: boolean;
  static hydrate: string;
  static files: TObj<any>;
  static scenes: TObj<any>;
  static images: TObj<any>;
  static audio: TObj<any>;

  static async build(options: BuildOptions): Promise<string> {
    Object.assign(this, options);

    this.files = options.files;
    this.scenes = {};
    this.images = {};
    this.audio = {};

    const output: string = await (this.hydrate ? buildJs(this) : this.buildHtml());

    const outputSize: number = new TextEncoder().encode(output).length;
    if (this.hydrate) {
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

  static async buildHtml(): Promise<string> {
    return REPLACE_HTML_TEMPLATE.replace(`AUTHOR`, this.author)
      .replace(`DESCRIPTION`, this.description)
      .replace(`GAME_NAME`, this.gameName)
      .replace(`SCRIPT;`, await buildJs(this));
  }
}

function fmtSize(n: number): string {
  return `${(n / 1000).toFixed(3)} kB`.padStart(12, ` `);
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

export type BuildObject = typeof Build;
