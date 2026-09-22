import localforage from "localforage";
import { build } from "./core";
import { setSetUp } from "../ui/LoadData";
import {
  config,
  hierarchySignal,
  files,
  keywords,
  testSceneSignal,
  type TFile,
  type TProject,
  project,
} from "./consts";

export function deepCopy<T>(obj: T): T {
  return JSON.parse(JSON.stringify(obj));
}

export function downloadFile(name: string, text: string) {
  const elemnet = document.createElement(`a`);
  elemnet.href = `data:text;charset=utf-8,${encodeURIComponent(text)}`;
  elemnet.download = name;
  elemnet.click();
}

export function isValidName(name: string) {
  return /^[a-z0-9_]+$/i.test(name);
}

export function camelToTitleCase(text: string) {
  return capitalize(
    text.replace(/([a-z])([A-Z])/g, `$1 $2`), // "someUglyText" => "Some Ugly Text"
  );
}

export function isCustomProp(text: string) {
  return !isCapitalized(text) && !keywords.includes(text);
}

export function isCapitalized(name: string) {
  return /^[A-Z]/.test(name);
}

export function capitalize(str: string) {
  return str.replace(/^./, (char) => char.toUpperCase());
}
export function decapitalize(str: string) {
  return str.replace(/^./, (char) => char.toLowerCase());
}

export function openMainScene() {
  setSetUp(true);

  const scene =
    files.Scenes[config.startingSceneName] ||
    Object.values(files.Scenes).find((s) => typeof s !== `string`);

  hierarchySignal.set(scene);
}

export function isOccupied(obj: TFile, name: string) {
  for (const key in obj) if (key === name) return true;
  return false;
}

// save file
export function saveProject(oldDate?: number) {
  localforage.setItem(config.gameName, getProjectObject(oldDate));
}

export function saveProjectFile(oldDate?: number) {
  downloadFile(`${config.gameName}.virginengine`, getProjectObject(oldDate));
}

function getProjectObject(oldDate?: number) {
  return JSON.stringify({ ...project, modifiedDate: oldDate ? oldDate : Date.now() } satisfies TProject);
}

// load file
export function loadProjectFromDisk() {
  const element = document.createElement(`input`);
  element.type = `file`;
  element.accept = `.virginengine`;
  Object.assign(element, {
    onchange: ({ target }: React.ChangeEvent<HTMLInputElement>) => {
      const reader = new FileReader();

      reader.onload = ({ target }) => {
        if (!target) throw new Error(`Not such target!`);
        const data = JSON.parse(target.result as string);

        loadProject(data);
        saveProject();
      };

      if (target.files) reader.readAsText(target.files[0]);
    },
  });
  element.click();
}

export function loadProject(data: TProject) {
  for (const key in files) delete files[key];
  for (const key in data.files) files[key] = data.files[key];
  // @ts-ignore don't get legacy bad configuration, get only current config shape
  for (const key in config) if (data.config[key]) config[key] = data.config[key];

  openMainScene();
  document.title = `${data.config.gameName} - VirginEngine`;
}

// type
export function getType(data: any): VTypes {
  if (typeof data !== `string`) return typeof data as VTypes;

  if (Array.isArray(data) || data[0] === `[`) return `array`;
  if (data.startsWith(`{`)) return `object`;
  if (data.startsWith(`function`)) return `function`;
  // if ([`"`, `'`, "`"].includes(data[0])) return `string`;
  return `string`;
}

// get file by path
export function fileFromPath(path: string) {
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
export async function buildProject() {
  downloadFile(`${config.gameName}.html`, await buildSafely(true));
}

export async function testProjects() {
  testSceneSignal.set(await buildSafely(false));
}

async function buildSafely(production: boolean) {
  const performanceInfo =
    config.performanceInfo.selected === `yes` || (!production && config.performanceInfo.selected === `dev`);

  const validConfig = {
    author: config.author,
    description: config.description,
    gameName: config.gameName,
    performanceInfo,
    startingSceneName: config.startingSceneName,
    fullScreen: config.fullScreen,

    files,
    production,
  };

  const html = (await build(validConfig))[`index.html`];
  if (!html) throw new Error(`Build faild!`);
  return html;
}

// zig-like switch
export function zswitch<T>(value: number | string, rest: TObj<() => T>) {
  return (rest[value] || rest.else)();
}
