import { build, type BuildOptions } from "./core";
import { files, keywords, type TFile, config } from "./consts";

export function deepCopy<T>(obj: T): T {
  return JSON.parse(JSON.stringify(obj));
}

export function setCursorPointer(pointer: boolean) {
  document.body.style.cursor = pointer ? `pointer` : ``;
}

export function downloadFile(name: string, text: string) {
  const elemnet = document.createElement(`a`);
  elemnet.href = `data:text;charset=utf-8,${encodeURIComponent(text)}`;
  elemnet.download = name;
  elemnet.click();
}

export function isValidName(name: string): boolean {
  return /^[a-z0-9_]+$/i.test(name);
}

export function camelToTitleCase(text: string): string {
  return capitalize(
    text.replace(/([a-z])([A-Z])/g, `$1 $2`), // "someUglyText" => "Some Ugly Text"
  );
}

export function isCustomProp(text: string): boolean {
  return !isCapitalized(text) && !keywords.includes(text);
}

export function isCapitalized(name: string): boolean {
  return /^[A-Z]/.test(name);
}

export function capitalize(str: string): string {
  return str.replace(/^./, (char) => char.toUpperCase());
}
export function decapitalize(str: string): string {
  return str.replace(/^./, (char) => char.toLowerCase());
}

export function isOccupied(obj: TFile, name: string): boolean {
  for (const key in obj) if (key === name) return true;
  return false;
}

// type
export function getType(data: any): VTypes {
  if (typeof data !== `string`) return typeof data as VTypes;

  if (Array.isArray(data) || data[0] === `[`) return `array`;
  if (data.startsWith(`{`)) return `object`;
  if (data.startsWith(`function`)) return `function`;
  if (/^(import|class|public)/.test(data)) return `script`;
  // if ([`"`, `'`, "`"].includes(data[0])) return `string`;
  return `string`;
}

// get file by path
export function fileFromPath(path: string): TFile {
  return path
    .split(`.`)
    .slice(1)
    .reduce((prev, key) => prev[key], files);
}

// image
// export function resizeSrcImage(src: string, w: number, h: number) {
//   return new Promise((resolve) => {
//     const canvas = document.createElement(`canvas`)
//     canvas.width = w
//     canvas.height = h
//     const ctx = canvas.getContext(`2d`)!

//     const img = new Image()

//     img.onload = () => {
//       let width = img.width
//       let height = img.height

//       const aspectRatio = width / height

//       let newWidth = w
//       let newHeight = h

//       if (width > height) {
//         newWidth *= aspectRatio
//       } else {
//         newHeight *= aspectRatio
//       }

//       let [x, y] = [0, 0]

//       if (width > height) {
//         x = (w - newWidth) / 2
//       } else {
//         y = (h - newHeight) / 2
//       }

//       console.log(x, y)

//       ctx.drawImage(img, 0, 0, width, height, x, y, newWidth, newHeight)
//       const newSrc = canvas.toDataURL()

//       resolve(newSrc)
//     }

//     img.src = src
//   })
// }

// build/test project
export async function buildProject(): Promise<void> {
  downloadFile(`${config.gameName}.html`, await buildSafely(true));
}

export async function buildSafely(production: boolean): Promise<string> {
  const performanceInfo =
    config.performanceInfo.selected === `yes` || (!production && config.performanceInfo.selected === `dev`);

  const validConfig: BuildOptions = {
    author: config.author,
    description: config.description,
    gameName: config.gameName,
    performanceInfo,
    startingSceneName: config.startingSceneName,
    fullScreen: config.fullScreen,

    files: deepCopy(files),
    production,
  };

  const html = await build(validConfig);
  if (!html) throw new Error(`Build faild!`);
  return html;
}

// zig-like switch
export function zswitch<T>(value: number | string, rest: TObj<() => T>) {
  return (rest[value] || rest.else)();
}
