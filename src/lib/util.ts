import localforage from "localforage";
import { build } from "../core";
import { config, hierarchySignal, files, keywords, setUpSignal, testSceneSignal } from "./consts";

export function deepCopy<T>(obj: T): T {
  return JSON.parse(JSON.stringify(obj));
}

export function downloadFile(name: string, text: string) {
  createElement({
    name: `a`,
    href: `data:text;charset=utf-8,${encodeURIComponent(text)}`,
    download: name,
  });
}

function createElement({ name, ...props }: TObj) {
  const element = document.createElement(name);
  for (const key in props) element[key] = props[key];
  element.click();
}

export function isValidName(name: string) {
  return isCapitalized(name) && /^[a-z0-9_]+$/i.test(name);
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

export function openMainScene() {
  setUpSignal.set(true);

  const scene = config.pathToMainScene
    .split(`.`)
    .slice(1)
    .reduce((prev, key) => prev[key], files);

  hierarchySignal.set(scene);
}

export function defaultNode({ position, rotation, scale, ...rest }: TObj = {}) {
  return Object.keys(rest).reduce((prev, key) => ({ [key]: rest[key], ...prev }), {
    type: `node`,
    transform: {
      position: position || { x: 0, y: 0 },
      rotation: rotation || 0,
      scale: scale || { x: 1, y: 1 },
    },
  });
}

export function isOccupied(obj: TObj, name: string) {
  for (const key in obj) if (key === name) return true;
  return false;
}

// SaveFile
export function saveProject(inFile?: any) {
  localforage.setItem(config.gameName, getProjectObject());
  if (inFile === true) {
    downloadFile(`${config.gameName}.virginengine`, getProjectObject());
  }
}

function getProjectObject() {
  return JSON.stringify({ config, files, modifiedDate: Date.now() } satisfies TProject);
}

// LoadFile
export function loadProject(data?: any) {
  if (data?.config) {
    // data is valid, do not load externaly
    // .config bacosuse of event passed in data variable
    loadProjectHelper(data);
  } else {
    createElement({
      name: `input`,
      type: `file`,
      accept: `.virginengine`,
      onchange: ({ target }: { target: any }) => {
        const reader = new FileReader();

        reader.onload = ({ target }: { target: any }) => {
          const data = JSON.parse(target.result);

          loadProjectHelper(data);
        };

        reader.readAsText(target.files[0]);
      },
    });
  }
}

function loadProjectHelper(data: any) {
  clearAssign(config, data.config);
  clearAssign(files, data.files);

  openMainScene();
}

function clearAssign(old: TObj, obj: TObj) {
  for (const key in old) delete old[key];
  for (const key in obj) old[key] = obj[key];
}

// Type
export function getType(data: any): VTypes {
  if (typeof data !== `string`) return typeof data as VTypes;

  if (Array.isArray(data) || data[0] === `[`) return `array`;
  if (data.startsWith(`{`)) return `object`;
  if (data.startsWith(`function`)) return `function`;
  if ([`"`, `'`, "`"].includes(data[0])) return `string`;
  return `string`;
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
  downloadFile(`${config.gameName}.html`, await build(getBuildConfig(true)));
}

export async function testProjects() {
  testSceneSignal.set(await build(getBuildConfig(false)));
}

function getBuildConfig(production: boolean) {
  const performanceInfo =
    config.performanceInfo.selected === `yes` || (!production && config.performanceInfo.selected === `dev`);

  return {
    ...config,
    performanceInfo,
    config,
    files,
    production,
  };
}
