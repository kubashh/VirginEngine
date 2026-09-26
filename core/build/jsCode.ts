import { minify_sync } from "terser";
import { keywords, optymalizeImageSrc } from "./util";
import { Build, type BuildOptions } from "./build";

const core = REPLACE_CORE;

export async function buildJs(options: BuildOptions) {
  const validCore = await buildValidCore(options);

  return !options.production ? validCore : minify_max(validCore);
}

async function buildValidCore(options: BuildOptions) {
  const arr = filesToString(options.files);

  for (const i in arr) arr[i] = await arr[i];

  return (
    core
      .split(`\n`)
      // remove fullscreen if not needed
      .filter((line) => options.fullScreen || !line.startsWith(`!document.fullscreenElement ?`))
      .join(`\n`)
      .replace(`var files`, Build.classArr.join(`\n`) + `\nconst files`)
      .replace(`REPLACE_FILES`, arr.join(``))
      .replace(`REPLACE_STARTING_SCENE_NAME`, options.startingSceneName)
      .replace(`REPLACE_CANVAS_ID`, options.hydrate || `canvas`)
      .replace(`REPLACE_PERFORMANCE_INFO`, String(options.performanceInfo))
  );
}

function filesToString(
  data: TObj<any> | string,
  name?: string,
  type?: string,
): (string | Promise<string>)[] {
  if (typeof data === `string` && data.startsWith(`class`)) {
    const match = data.match(/\bclass\s+([A-Za-z_$][\w$]*)\b/);
    const className = match?.[1];
    if (!className) throw new Error(`this class doesn't have name!\n${data}`);
    Build.classArr.push(data);
    return [className];
  }
  if (typeof data !== `object`)
    return [type === `node` && isCustomProp(name!) ? data : JSON.stringify(data)];

  if (Array.isArray(data)) {
    return [
      `[`,
      data
        .reduce((prev, e) => {
          return [...prev, ...filesToString(e), `,`];
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
    return data.selected;
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

function minify_max(code: string) {
  const out = minify_sync(code, {
    module: true, // size -10%
    ecma: 2025,
    // compress: true,
    compress: {
      passes: 10,
      toplevel: true,

      // Remove debugging code.
      drop_console: true,
      drop_debugger: true,

      // More aggressive transformations.
      unsafe: true,
      unsafe_arrows: true,
      unsafe_comps: true,
      pure_getters: true,

      // Optional extra optimizations.
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
  });

  if (out.code == undefined) throw Error(JSON.stringify(out));

  return out.code;
}
