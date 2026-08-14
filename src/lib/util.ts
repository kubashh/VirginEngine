import localforage from "localforage";
import { build } from "./core";
import {
  config,
  hierarchySignal,
  files,
  keywords,
  setUpSignal,
  testSceneSignal,
  type TConfig,
  type TFile,
} from "./consts";

export function deepCopy<T>(obj: T): T {
  return JSON.parse(JSON.stringify(obj));
}

export function downloadFile(name: string, text: string) {
  createElementClick({
    name: `a`,
    href: `data:text;charset=utf-8,${encodeURIComponent(text)}`,
    download: name,
  });
}

function createElementClick({ name, ...props }: CreateElementPropsProps) {
  const element = document.createElement(name);
  Object.assign(element, props);
  element.click();
}

export function isValidName(name: string) {
  return /^[a-z0-9_]+$/i.test(name);
}

export function camelToTitleCase(text: string) {
  return capitalize(
    text.replace(/([a-z])([A-Z])/g, `$1 $2`), // "someUglyText" → "some Ugly Text"
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
  setUpSignal.set(true);

  const scene = config.pathToMainScene
    .split(`.`)
    .slice(1)
    .reduce((prev, key) => prev[key], files);

  hierarchySignal.set(scene);
}

export function isOccupied(obj: TFile, name: string) {
  for (const key in obj) if (key === name) return true;
  return false;
}

// SaveFile
export function saveProject() {
  localforage.setItem(config.gameName, getProjectObject());
}

export function saveProjectFile() {
  downloadFile(`${config.gameName}.virginengine`, getProjectObject());
}

function getProjectObject() {
  return JSON.stringify({ config, files, modifiedDate: Date.now() } satisfies TProject);
}

// LoadFile
export function loadProjectFromDisk() {
  createElementClick({
    name: `input`,
    type: `file`,
    accept: `.virginengine`,
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
}

export function loadProject(data: TProject) {
  Object.assign(config, data.config); // don't remove old props, config have always same shape (TConfig)
  for (const key in files) delete files[key];
  for (const key in data.files) files[key] = data.files[key];

  openMainScene();
}

// Type
export function getType(data: any): VTypes {
  if (typeof data !== `string`) return typeof data as VTypes;

  if (Array.isArray(data) || data[0] === `[`) return `array`;
  if (data.startsWith(`{`)) return `object`;
  if (data.startsWith(`function`)) return `function`;
  // if ([`"`, `'`, "`"].includes(data[0])) return `string`;
  return `string`;
}

// Get file by path
export function fileFromPath(path: string) {
  // if(path.startsWith(`files.`)) path =
  return path
    .split(`.`)
    .slice(1)
    .reduce((prev, key) => prev[key], files);
}

// Image

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

// Wait
export function wait(ms: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

// Build/Test Project
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
    ...config,
    performanceInfo,
    config,
    files,
    production,
  };

  const html = (await build(validConfig))[`index.html`];
  if (!html) throw new Error(`Build faild! Output: ${JSON.stringify(html)}`);
  return html;
}

// Zig-like switch
export function zswitch<T>(value: number | string, rest: TObj<() => T>) {
  return (rest[value] || rest.else)();
}

type CreateElementPropsProps = {
  name: string;
  type?: string;
  href?: string;
  download?: string;
  accept?: string;
  onchange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

type TProject = {
  files: TFile;
  config: TConfig;
  modifiedDate: number;
};
