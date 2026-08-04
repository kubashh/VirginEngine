import { minify_sync } from "terser";
import { keywords, optymalizeImageSrc } from "./util";
import type { BuildOptions } from "./build";

const core = REPLACE_CORE;

export async function buildJs(options: BuildOptions) {
  const validCore = await buildValidCore(options);

  return !options.production ? validCore : minify_max(validCore, 10);
}

async function buildValidCore(options: BuildOptions) {
  const arr = filesToString(options.files);

  for (const i in arr) arr[i] = await arr[i];

  return (
    core // replacePerformanceInfo(options)
      .split(`\n`)
      // Remove fullscreen if not needed
      .filter((line) => options.fullScreen || !line.startsWith(`!document.fullscreenElement ?`))
      .join(`\n`)
      .replace(`REPLACE_FILES`, arr.join(``))
      .replace(`REPLACE_PATH_TO_MAIN_SCENE`, options.pathToMainScene)
      .replace(`REPLACE_CANVAS_ID`, options.hydrate || `canvas`)
      .replace(`REPLACE_PERFORMANCE_INFO`, String(options.performanceInfo))
  );
}

function filesToString(data: Any, name?: string, type?: string): (string | Promise<string>)[] {
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

function minify_max(code: string, limit: number = 10) {
  let out = code;
  let len = code.length;
  for (let i = 0; i < limit; i++) {
    const newOut = minify_sync(out, {
      module: true, // size -10%
    });

    if (newOut.code == undefined) throw Error(JSON.stringify(out));

    if (newOut.code.length < len) {
      code = newOut.code;
      len = newOut.code.length;
    } else break;
  }
  return out;
}
