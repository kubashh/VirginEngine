import { buildJs } from "./jsCode";

declare const REPLACE_VIRGIN_ENGINE_VERSION: string;
declare const REPLACE_HTML_TEMPLATE: string;

export const virginEngineVersion: string = REPLACE_VIRGIN_ENGINE_VERSION;
const htmlTemplate = REPLACE_HTML_TEMPLATE;

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

    const output = this.hydrate ? await buildJs(this) : await this.buildHtml();

    const outputSize = new TextEncoder().encode(output).length;
    if (this.hydrate) {
      console.log(`JS size: ${(outputSize / 1000).toFixed(3)} kB`);
    } else {
      const jsSlice = output.slice(
        output.indexOf(`<script>`) + `<script>`.length,
        output.indexOf(`</script>`),
      );
      const jsSize = new TextEncoder().encode(jsSlice).length;
      const htmlSize = outputSize - jsSize;
      console.log(
        `index.html size: ${(outputSize / 1000).toFixed(3)} kB\nHTML   ${(htmlSize / 1000).toFixed(3)} kB\nJS     ${(jsSize / 1000).toFixed(3)} kB`,
      );
    }

    return output;
  }

  static async buildHtml(): Promise<string> {
    return htmlTemplate
      .replace(`REPLACE_AUTHOR`, this.author)
      .replace(`REPLACE_DESCRIPTION`, this.description)
      .replace(`REPLACE_GAME_NAME`, this.gameName)
      .replace(`SCRIPT;`, await buildJs(this));
  }
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
