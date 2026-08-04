import { buildJs } from "./jsCode";

export const virginEngineVersion = REPLACE_VIRGINE_ENGINE_VERSION;
const htmlTemplate = REPLACE_HTML_TEMPLATE;

// Build project
export async function build(options: BuildOptions): Promise<BuildOutput> {
  const validOptions: Required<BuildOptions> = {
    ...options,
    production: options.production !== false, // default: true
    hydrate: options.hydrate || ``, // default: ``
    separateJs: options.separateJs !== false, // default: true
    log: options.log !== false, // default: true
  };

  const output: BuildOutput = {};

  if (validOptions.hydrate) {
    output[`script.js`] = await buildJs(validOptions);
  } else if (validOptions.separateJs) {
    // TODO make separeteJs works
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
  return buildBasicHtml(validOptions).replaceAll(`SCRIPT`, await buildJs(validOptions));
}

function buildBasicHtml(options: Required<BuildOptions>) {
  return htmlTemplate
    .replaceAll(`REPLACE_AUTHOR`, options.author)
    .replaceAll(`REPLACE_DESCRIPTION`, options.description)
    .replaceAll(`REPLACE_GAME_NAME`, options.gameName);
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

export type BuildOutput = {
  "index.html"?: string;
  "script.js"?: string;
};
