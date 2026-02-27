import { allowedNameChars, alphabet, Camera, ctx, files, nodes } from "../values/consts";

// Time
export async function wait(time?: number) {
  await new Promise((r) => setTimeout(r, time));
}

// Is child
export function isChildKey(text: string) {
  return alphabet.includes(text.at(0)!);
}

// Deep copy
export function deepCopy<T>(data: T): T {
  if (Array.isArray(data)) {
    return data.reduce((prev, val) => [...prev, deepCopy(val)], []);
  }

  if (typeof data === `object`) {
    const newObj: any = {};

    for (const key in data) {
      if ([`parent`, `toUpdate`, `toRender`, `node`].includes(key)) continue;
      newObj[key] = deepCopy(data[key]);
    }

    return newObj;
  }

  return data;
}

// Draw on canvas

const textAlign = new Map<number, CanvasTextAlign>([
  [-1, `left`],
  [0, `center`],
  [1, `right`],
]);
const textBaseline = new Map<number, CanvasTextBaseline>([
  [-1, `top`],
  [0, `middle`],
  [1, `bottom`],
]);

export function drawText({
  text,
  color,
  x,
  y,
  w,
  h,
  rect = { x: 0, y: 0 },
  font = `serif`,
  align,
  ...rest
}: drawTextProps) {
  ctx.save();

  ctx.fillStyle = color;

  if (align) {
    ctx.textAlign = textAlign.get(align.x)!;
    ctx.textBaseline = textBaseline.get(align.y)!;
  }

  x += (rect.x + 1) * Camera.xOffset;
  y += (rect.y + 1) * Camera.yOffset;

  for (const key in rest) {
    (ctx as Any)[key] = (rest as Any)[key];
  }

  ctx.font = `${h}px ${font}`;
  ctx.fillText(text, x, y, w);

  ctx.restore();
}

export function file(path: string) {
  return path
    .split(`.`)
    .slice(1)
    .reduce((prev, key) => prev[key], files as any);
}

export function onresize() {
  ctx.canvas.width = window.innerWidth;
  ctx.canvas.height = window.innerHeight;
  Camera.xOffset = window.innerWidth * 0.5;
  Camera.yOffset = window.innerHeight * 0.5;

  // Resize sprites staticDrawProps
  for (const node of nodes) node.sprite?.resize();
}

export function randInt(min: number, max?: number) {
  return Math.floor(rand(min, max));
}

export function rand(min: number = 1, max?: number) {
  return max ? Math.random() * (max - min) + min : Math.random() * min;
}

export function randStr(n = 1) {
  let str = ``;
  for (let i = 0; i < n; i++) {
    str += allowedNameChars.at(randInt(allowedNameChars.length));
  }
  return str;
}

export function randColor() {
  return `#${randHex()}${randHex()}${randHex()}`;
}

function randHex() {
  const n = randInt(16);
  return n < 10 ? String(n) : String.fromCharCode(45 + n);
}

export function lerp(a: XY, b: XY, t: number) {
  return {
    x: a.x + (b.x - a.x) * t,
    y: a.y + (b.y - a.y) * t,
  };
}
