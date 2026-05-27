import { jsCode } from "./jsCode";

export const virginEngineVersion = REPLACE_VIRGINE_ENGINE_VERSION;

export class Build implements BuildOptions {
  static htmlTemplate = REPLACE_HTML_TEMPLATE;

  author: string;
  description: string;
  gameName: string;
  performanceInfo: boolean;
  pathToMainScene: string;
  fullScreen: boolean;

  files: any;
  production: boolean;
  hydrate?: string;

  constructor(options: BuildOptions) {
    this.author = options.author;
    this.description = options.description;
    this.gameName = options.gameName;
    this.performanceInfo = options.performanceInfo;
    this.pathToMainScene = options.pathToMainScene;
    this.fullScreen = options.fullScreen;
    this.files = options.files;
    this.production = options.production !== false;
    this.hydrate = options.hydrate;
  }

  js() {
    return jsCode(this);
  }

  async html() {
    return this.basicHtml().replaceAll(`SCRIPT`, await this.js());
  }

  basicHtml() {
    return Build.htmlTemplate
      .replaceAll(`AUTHOR`, this.author)
      .replaceAll(`DESCRIPTION`, this.description)
      .replaceAll(`GAME_NAME`, this.gameName);
  }

  async separated() {
    return {
      js: ``,
      html: ``,
    };
  }
}

// returns full html or js code
export async function build(options: BuildOptions) {
  const build = new Build(options);

  return build.hydrate ? await build.js() : await build.html();
}

type BuildOptions = {
  author: string;
  description: string;
  gameName: string;
  performanceInfo: boolean;
  pathToMainScene: string;
  fullScreen: boolean;

  production?: boolean;
  hydrate?: string;
  separateJs?: boolean;
  files: TObj<any>;
};
