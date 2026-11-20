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

// build/test project
export async function buildProject(): Promise<void> {
  downloadFile(`${config.gameName}.${config.hydrateCanvasId ? `js` : `html`}`, await buildSafely(true));
}

export async function buildSafely(production: boolean): Promise<string> {
  const validConfig: BuildOptions = {
    author: config.author,
    description: config.description,
    gameName: config.gameName,
    performanceInfo: !production && config.devPerformanceInfo,
    startingSceneName: config.startingSceneName,
    fullScreen: config.fullScreen,

    files: deepCopy(files),
    production,
    hydrate: production ? config.hydrateCanvasId : ``,
  };

  const html = await build(validConfig);
  if (!html) throw new Error(`Build faild!`);
  return html;
}

// zig-like switch
export function zswitch<T>(value: number | string, rest: TObj<() => T>) {
  return (rest[value] || rest.else)();
}

// resizeSrcImage: https://github.com/kubashh/VirginEngine/blob/326d97f26e3b892578ae7fb809d4c7666a034385/src/lib/util.ts
