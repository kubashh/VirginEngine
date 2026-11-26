// returns preexecuted css
export function minifyCss(css: string): string {
  css = inlineVariables(css);
  css = removeUnusedVariables(css);
  css = removeEmptyRoots(css);
  css = exeCalc(css);
  css = minifyColors(css);
  css = minifySyntax(css);

  return css;
}

//
// inlineVariables & removeUnusedVariables & removeEmptyRoots
//

function inlineVariables(css: string): string {
  const variables = getVariables(css);

  for (const [name, variable] of Object.entries(variables)) {
    css = css.replaceAll(`var(${name})`, variable);
  }

  return css;
}

function removeUnusedVariables(css: string): string {
  const variables: Record<string, string> = getVariables(css);
  const varsArr: string[] = Object.keys(variables);
  const unusedVars: string[] = [];

  for (const v of varsArr) {
    if (!css.includes(`var(${v})`)) {
      unusedVars.push(v);
    }
  }

  for (const v of unusedVars) {
    css = css
      .replace(new RegExp(`${v}:.*?}`), `}`) // first edge case: --var:name}
      .replace(new RegExp(`${v}:.*?;`), ``); // normal
  }

  return css;
}

function getVariables(css: string): Record<string, string> {
  const variables: Record<string, string> = {};

  const roots = getRoots(css);

  const varStrings = roots
    .join(`;`)
    .split(`;`)
    .filter((s) => s);
  const varsArr = varStrings.map((s) => s.split(`:`).map((s) => s.trim()));
  // those are arguments defined once so we can inline and delete them
  const validArgs = varsArr.filter((p) => css.indexOf(p[0] + `:`, css.indexOf(p[0] + `:`) + 1) < 0);
  for (const [name, value] of validArgs) {
    variables[name] = value;
  }

  return variables;
}

function getRoots(css: string): string[] {
  const roots: string[] = [];

  const rootStartIndexes = [];
  for (let i = css.indexOf(`:root`); i >= 0; i = css.indexOf(`:root`, i + 7)) {
    rootStartIndexes.push(i);
  }

  for (let startDec of rootStartIndexes) {
    startDec = css.indexOf(`{`, startDec) + 1;
    roots.push(css.slice(startDec, css.indexOf(`}`, startDec)).trim());
  }

  return roots;
}

// remove empty root & host and remove empty theme layer. it's enought for this project
function removeEmptyRoots(css: string): string {
  return css.replace(`:root{}`, ``).replace(`:root,:host{}`, ``);
}

//
// exeCalc
//

// exec basic calc function
function exeCalc(css: string): string {
  const arr = css.matchAll(/calc\(.*?\)/g);
  const calcExpressions = new Set(arr.toArray().map((arr) => arr[0]));

  for (const exp of calcExpressions.values()) {
    const slice = exp.slice(5, -1).trim();
    const ops = [`+`, `-`, `*`, `/`];
    let opI = -1;
    for (let i = 0; i < ops.length && opI < 0; i++) {
      opI = slice.indexOf(ops[i]);
    }
    let aSlice = slice.slice(0, opI).trim();
    let op = slice[opI];
    let bSlice = slice.slice(opI + 1).trim();
    let unit: string = ``;
    let a = Number(aSlice);
    let b = Number(bSlice);

    if (Number.isNaN(a) && Number.isNaN(b)) continue;

    if (Number.isNaN(a)) {
      let ind = aSlice.length;
      while (Number.isNaN(Number(aSlice[ind]))) {
        ind--;
      }
      ind++;
      a = Number(aSlice.slice(0, ind));
      unit = aSlice.slice(ind);
    }
    if (Number.isNaN(b)) {
      let ind = bSlice.length;
      while (Number.isNaN(Number(bSlice[ind]))) {
        ind--;
      }
      ind++;
      b = Number(bSlice.slice(0, ind));
      unit = bSlice.slice(ind);
    }

    const result = op === `+` ? a + b : op === `-` ? a - b : op === `*` ? a * b : a / b;

    if (typeof result === `number` && !Number.isNaN(result)) {
      if (result === 0) unit = ``;
      const newNumber = Number(result.toFixed(3));
      const str = newNumber < 1 && newNumber !== 0 ? newNumber.toString().slice(1) : newNumber; // remove trallin zero
      css = css.replaceAll(exp, `${str}${unit}`);
    }
  }

  css = css
    .replaceAll(/var\(--tw-leading,(.+?)\)/g, `$1`) // simplify var(--tw-leading,1.333) like
    .replaceAll(`var(--tw-border-style)`, `solid`) // --tw-border-style is always solid
    .replaceAll(/\@property \-\-tw\-border\-style\{.+?\}|--tw-border-style:.+?;/g, ``); // remove --tw-border-style declarations

  return css;
}

//
// minifyColors
//

function minifyColors(css: string): string {
  const oklchs = css
    .matchAll(/oklch\(.*?\)/g)
    .toArray()
    .map((r) => r[0]);

  for (const color of oklchs) {
    const [LPr, C, h] = color.slice(6, -1).split(` `);
    const hexColor = oklchToHex(Number(LPr.slice(0, -1)) / 100, Number(C), Number(h));

    css = css.replaceAll(color, hexColor);
  }

  return css;
}

function oklchToHex(L: number, C: number, h: number) {
  const radians = (h * Math.PI) / 180;
  const a = C * Math.cos(radians);
  const b = C * Math.sin(radians);

  const l_ = L + 0.3963377774 * a + 0.2158037573 * b;
  const m_ = L - 0.1055613458 * a - 0.0638541728 * b;
  const s_ = L - 0.0894841775 * a - 1.291485548 * b;

  const l = l_ ** 3;
  const m = m_ ** 3;
  const s = s_ ** 3;

  const linearRgb = [
    4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s,
    -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s,
    -0.0041960863 * l - 0.7034186147 * m + 1.707614701 * s,
  ];

  return (
    `#` +
    linearRgb
      .map((x) =>
        Math.round(toSrgb(x) * 255)
          .toString(16)
          .padStart(2, `0`),
      )
      .join(``)
  );
}

function toSrgb(x: number) {
  x = Math.max(0, Math.min(1, x)); // clip to sRGB gamut
  return x <= 0.0031308 ? 12.92 * x : 1.055 * x ** (1 / 2.4) - 0.055;
}

//
// minifySyntax
//

function minifySyntax(css: string): string {
  return css
    .replaceAll(`\n`, ` `)
    .replaceAll(`: `, `:`)
    .replaceAll(/\/\*[\s\S]*?\*\//g, ``) // remove comments
    .trim();
}
