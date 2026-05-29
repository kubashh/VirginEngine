import { jsCode } from "./jsCode";

export const virginEngineVersion = REPLACE_VIRGINE_ENGINE_VERSION;
const htmlTemplate = REPLACE_HTML_TEMPLATE;

// Build project
export async function build(options: BuildOptions): Promise<BuildOutput> {
  const validOptions: Required<BuildOptions> = {
    ...options,
    production: options.production !== false,
    hydrate: options.hydrate || ``,
    separateJs: options.separateJs !== false,
    log: options.log !== false,
  };

  const output: BuildOutput = {};

  if (validOptions.hydrate) {
    output[`script.js`] = await jsCode(validOptions);
  } else if (validOptions.separateJs) {
    output[`index.html`] = await buildHtml(validOptions);
  } else {
    output[`index.html`] = await buildHtml(validOptions);
  }

  if (options.log) {
    const htmlSize = output["index.html"]?.length || 0;
    const jsSize = output["script.js"]?.length || 0;
    if (validOptions.hydrate) console.log(`JS size: ${jsSize}`);
    else if (validOptions.separateJs) console.log(`HTML size: ${htmlSize}\nJS size: ${jsSize}`);
    else {
      const jsSize = output["index.html"]!.indexOf(`</script>`) - output["index.html"]!.indexOf(`<script>`);
      console.log(`index.html size: ${htmlSize + jsSize} (${htmlSize} (HTML) + ${jsSize} (JS))`);
    }
  }

  return output;
}

async function buildHtml(validOptions: Required<BuildOptions>) {
  return buildBasicHtml(validOptions).replaceAll(`SCRIPT`, await jsCode(validOptions));
}

function buildBasicHtml(options: Required<BuildOptions>) {
  return htmlTemplate
    .replaceAll(`AUTHOR`, options.author)
    .replaceAll(`DESCRIPTION`, options.description)
    .replaceAll(`GAME_NAME`, options.gameName);
}

export type BuildOptions = {
  author: string;
  description: string;
  gameName: string;
  performanceInfo: boolean;
  pathToMainScene: string;
  fullScreen: boolean;

  production?: boolean;
  hydrate?: string;
  separateJs?: boolean;
  log?: boolean;
  files: TObj<any>;
};

type BuildOutput = {
  "index.html"?: string;
  "script.js"?: string;
};
