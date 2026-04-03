import { minify_sync } from "terser";
import { core } from "./core";
import { keywords, optymalizeImageSrc } from "./util";
import type { Build, BuildConfig } from "./build";

export async function jsCode(options: Build) {
  const validCore = await coreConfig(options);

  if (!options.production) return validCore;

  const out = minify_sync(validCore, {
    module: true, // size -10%
  });

  console.log(out.code?.length);

  if (out.code) return out.code;

  throw Error(JSON.stringify(out));
}

let performanceInfo = true;
async function coreConfig({ config, files, production }: Build) {
  const arr = filesToString(files);

  for (const i in arr) arr[i] = await arr[i];

  performanceInfo =
    config.performanceInfo === `yes` || ((!production && config.performanceInfo === `dev`) as boolean);

  return replacePerformanceInfo(core)
    .split(`\n`)
    .filter((line) => filterFullScreen(config, line))
    .join(`\n`)
    .replace(`"REPLACE_FILES"`, arr.join(``))
    .replace(`"REPLACE_PATH_TO_MAIN_SCENE"`, config.pathToMainScene);
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

function filterFullScreen(config: BuildConfig, line: string) {
  return config.fullScreen || !line.startsWith(`!document.fullscreenElement ?`);
}

function replacePerformanceInfo(core: string) {
  if (performanceInfo) return core;

  return core
    .replaceAll(
      `for (const text of [...renderTimer.allFormatted, ...updateTimer.allFormatted]) {
drawText({ text, ...props });
props.y += 18;
}`,
      ``,
    )
    .replaceAll(
      `renderTimer.measure({ Sprite: renderSprite, Text: renderText });`,
      `renderSprite();renderText();`,
    )
    .replaceAll(
      `updateTimer.measure({ Physics: updatePhysics, Nodes: updateNodes });`,
      `updatePhysics();updateNodes();`,
    )
    .replaceAll(`Timer.reset();`, ``)
    .replaceAll(`drawPerformanceInfo();`, ``)
    .split(`\n`)
    .filter((line) => !line.includes(`renderTimer`) && !line.includes(`updateTimer`))
    .join(`\n`);
}
