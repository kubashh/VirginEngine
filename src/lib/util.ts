import { config, hierarchySignal, files, keywords, setUpSignal } from "./consts";

export function deepCopy<T>(obj: T): T {
  return JSON.parse(JSON.stringify(obj));
}

function createElement({ name, ...props }: Any) {
  const element = document.createElement(name);
  for (const key in props) element[key] = props[key];
  element.click();
}

export function downloadFile(name: string, text: string) {
  createElement({
    name: `a`,
    href: `data:text;charset=utf-8,${encodeURIComponent(text)}`,
    download: name,
  });
}

export function isValidName(name: string) {
  return isCapitalized(name) && /^[a-z0-9_]+$/i.test(name);
}

export function camelToTitleCase(text: string) {
  if (!text) return "";

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

export function defaultNode({ position, rotation, scale, ...rest }: Any = {}) {
  return Object.keys(rest).reduce((prev, key) => ({ [key]: rest[key], ...prev }), {
    type: `node`,
    transform: {
      position: position || { x: 0, y: 0 },
      rotation: rotation || 0,
      scale: scale || { x: 1, y: 1 },
    },
  });
}

export function isOccupied(obj: Any, name: string) {
  for (const key in obj) if (key === name) return true;
  return false;
}

// SaveFile
export function saveProject() {
  downloadFile(`${config.gameName}.virginengine`, JSON.stringify({ config, files }));
}

// LoadFile
function clearAssign(old: Any, obj: Any) {
  for (const key in old) delete old[key];
  for (const key in obj) old[key] = obj[key];
}

export function loadProject() {
  createElement({
    name: `input`,
    type: `file`,
    accept: `.virginengine`,
    onchange: ({ target }: { target: any }) => {
      const reader = new FileReader();

      reader.onload = ({ target }: { target: any }) => {
        const data = JSON.parse(target.result);

        clearAssign(config, data.config);
        clearAssign(files, data.files);

        openMainScene();
      };

      reader.readAsText(target.files[0]);
    },
  });
}

// Type
export function getType(data: any) {
  if (typeof data !== `string`) return typeof data as VTypes;

  if (Array.isArray(data) || data[0] === `[`) return `array`;
  if (data[0] === `{`) return `object`;
  if (data.indexOf(`function`) === 0) return `function`;
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

export function optymalizeImageSrc(src: string, quality: number) {
  const { resolve, promise } = Promise.withResolvers<string>();

  if (quality === 1) resolve(src);

  const img = new Image();

  img.onload = () => {
    const canvas = document.createElement(`canvas`);
    canvas.width = img.width;
    canvas.height = img.height;

    const ctx = canvas.getContext(`2d`)!;
    ctx.drawImage(img, 0, 0, img.width, img.height);

    const newSrc = canvas.toDataURL(`image/jpeg`, quality);

    console.log(src.length, newSrc.length);

    resolve(newSrc.length < src.length ? newSrc : src);
  };

  img.src = src;

  return promise;
}
