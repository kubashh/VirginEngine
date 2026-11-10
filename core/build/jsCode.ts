import { minify_sync } from "terser";
import { keywords, optymalizeImageSrc } from "./util";
import { type BuildOptions } from "./build";

declare const REPLACE_CORE: string;
const core: string = REPLACE_CORE;

const classArr: string[] = [];

export async function buildJs(options: BuildOptions): Promise<string> {
  console.log(JSON.parse(JSON.stringify(options.files)));
  Preprocessing.preprocessing(options.files);
  console.log(JSON.parse(JSON.stringify(options.files)));

  const validCore = await buildValidCore(options);
  classArr.length = 0;

  return !options.production ? validCore : minify_max(validCore);
}

class Preprocessing {
  private static assetsPathsI = 0;
  private static files: TObj<any>;
  private static mediaPaths: AssetPathOut[] = [];

  static preprocessing(files: TObj<any>) {
    this.files = files;

    this.setAssetsPaths(files, `files`);
    this.optimizeMedia(files, `files`);

    this.deleteEmptyFolders(this.files, `files`, this.files);
  }

  private static setAssetsPaths(file: TObj<any>, path: string) {
    if (typeof file !== `object`) return;
    if (file.type === `img` || file.type === `audio`) {
      this.mediaPaths.push({
        prevPath: path,
        newI: this.assetsPathsI,
        newPath: `files.${this.assetsPathsI}`,
        file: file,
      });
      this.assetsPathsI++;
    } else {
      for (const key in file) this.setAssetsPaths(file[key], `${path}.${key}`);
    }
  }

  private static optimizeMedia(file: any, path: string) {
    if (typeof file !== `object`) return;
    if (file.type === `img` || file.type === `audio`) {
      // move content
      this.replaceMedia(path);
    } else if (file.type === `scene`) {
      // replace node with optimized paths
      this.optimizeNode(file);
    } else {
      for (const key in file) {
        this.optimizeMedia(file[key], `${path}.${key}`);
      }
    }
  }

  private static replaceMedia(path: string) {
    const inp = this.mediaPaths.find((inp) => inp.prevPath === path);
    if (!inp) throw new Error(`BuildError: can't find path when optiming nodes!`);
    this.files[String(inp.newI)] = inp.file;

    // find parrent
    let parent = this.files;
    for (const sub of path.split(`.`).slice(1, -1)) {
      parent = parent[sub];
    }
    delete parent[path.split(`.`).at(-1)!];
  }

  private static optimizeNode(node: TObj<any>) {
    if (node.type === `node`) {
      if (node.sprite?.path) {
        const inp = this.mediaPaths.find((inp) => inp.prevPath === node.sprite.path);
        if (!inp) throw new Error(`BuildError: can't find path when optiming nodes!`);
        node.sprite.path = inp.newPath;
      } else if (node.audio?.path) {
        const inp = this.mediaPaths.find((inp) => inp.prevPath === node.audio.path);
        if (!inp) throw new Error(`BuildError: can't find path when optiming nodes!`);
        node.audio.path = inp.newPath;
      }
    }

    for (const key in node) {
      if (node[key].type === `node`) {
        this.optimizeNode(node[key]);
      }
    }
  }

  private static deleteEmptyFolders(parent: TObj<any>, key: string, file: TObj<any>) {
    for (const key in file) {
      if (typeof file[key] === `object` && file[key].type === `folder`) {
        if (Object.keys(file[key]).length <= 1) {
          delete file[key];
        } else {
          this.deleteEmptyFolders(file, key, file[key]);
        }
      }
    }

    // this make sure that file will be deleted if is empty after moving media
    if (Object.keys(file).length <= 1) {
      delete parent[key];
    }
  }
}

async function buildValidCore(options: BuildOptions): Promise<string> {
  const arr = filesToString(options.files);

  for (const i in arr) arr[i] = await arr[i];

  return (
    core
      .split(`\n`)
      // remove fullscreen if not needed
      .filter((line) => options.fullScreen || !line.startsWith(`!document.fullscreenElement ?`))
      .join(`\n`)
      .replace(`var files`, classArr.join(`\n`) + `\nconst files`)
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
    classArr.push(data);
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

type AssetPathOut = { prevPath: string; newI: number; newPath: string; file: any };
