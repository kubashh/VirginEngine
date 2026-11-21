import { minify_sync, type MinifyOptions } from "terser";
import { keywords, optymalizeImageSrc } from "./util";
import { type BuildObject } from "./build";
import { preprocessing } from "./preprocessing";

declare const REPLACE_CORE: string;

const declarations: string[] = [];

const minifyOptions: MinifyOptions = {
  module: true, // size -10%
  ecma: 2025,
  // compress: true,
  compress: {
    passes: 10,
    toplevel: true,

    // remove debugging code
    drop_console: true,
    drop_debugger: true,

    // more aggressive transformations
    unsafe: true,
    unsafe_arrows: true,
    unsafe_comps: true,
    pure_getters: true,

    // optional extra optimizations
    hoist_props: true,
    reduce_funcs: true,
    reduce_vars: true,
    collapse_vars: true,
    inline: 3,
  },
  mangle: true,
  format: {
    comments: false,
  },
};

export async function buildJs(options: BuildObject): Promise<string> {
  preprocessing(options);

  const validCore = await buildValidCore(options);

  if (!options.production) return validCore;

  const out = minify_sync(validCore, minifyOptions);

  if (!out.code) throw Error(JSON.stringify(out));

  return out.code;
}

async function buildValidCore(options: BuildObject): Promise<string> {
  const images = await Array.fromAsync(filesToString(options.images, ``, ``));
  const audio = await Array.fromAsync(filesToString(options.audio, ``, ``));
  const scenes = await Array.fromAsync(filesToString(options.scenes, ``, ``));

  const validCore = REPLACE_CORE.split(`\n`)
    // remove fullscreen if not needed
    .filter((line) => options.fullScreen || !line.startsWith(`!document.fullscreenElement ?`))
    .join(`\n`)
    .replace(`REPLACE_IMAGES`, images.join(``))
    .replace(`REPLACE_AUDIO`, audio.join(``))
    .replace(`var scene`, declarations.join(``) + `var scene`)
    .replace(`REPLACE_SCENES`, scenes.join(``))
    .replace(`REPLACE_STARTING_SCENE_NAME`, options.startingSceneName)
    .replace(`REPLACE_CANVAS_ID`, options.hydrate || `canvas`)
    .replace(`REPLACE_PERFORMANCE_INFO`, String(options.performanceInfo));

  declarations.length = 0;

  return validCore;
}

function filesToString(data: TObj<any> | string, name: string, type: string): (string | Promise<string>)[] {
  if (typeof data === `string` && data.startsWith(`class`)) {
    const match = data.match(/\bclass\s+([A-Za-z_$][\w$]*)\b/);
    const className = match?.[1];
    if (!className) throw new Error(`this class doesn't have name!\n${data}`);
    declarations.push(data);
    return [className];
  }
  if (typeof data !== `object`)
    return [type === `node` && isCustomProp(name!) ? data : JSON.stringify(data)];

  if (Array.isArray(data)) {
    return [
      `[`,
      data
        .reduce((prev, e) => {
          return [...prev, ...filesToString(e, ``, ``), `,`];
        }, [])
        .slice(0, -1),
      `]`,
    ];
  }

  if (data.type === `img`) {
    return [`"`, optymalizeImageSrc(data.src, data.quality), `"`];
  } else if (data.type === `audio`) {
    return [`"${data.src}"`];
  } else if (data.type === `enum`) {
    return [data.selected];
  }

  return [
    `{`,
    ...Object.keys(data)
      .filter((key) => key !== `type`)
      .reduce(
        (prev, key) => {
          return [...prev, `${key}:`, ...filesToString(data[key], key, data.type), `,`];
        },
        [] as (string | Promise<string>)[],
      )
      .slice(0, -1),
    `}`,
  ];
}

function isCustomProp(text: string) {
  return !/^[A-Z]/.test(text) && !keywords.includes(text);
}
