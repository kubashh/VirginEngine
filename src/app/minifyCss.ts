// returns preexecuted css
export function minifyCss(css: string): string {
  css = inlineVariables(css);
  // css = removeUnusedVariables(css);
  css = exeCalc(css);
  css = minifySyntax(css);

  return css;
}

function inlineVariables(css: string): string {
  const variables = getVariables(css);

  for (const [name, variable] of Object.entries(variables)) {
    css = css.replaceAll(`var(${name})`, variable);
  }

  return css;
}

// function removeUnusedVariables(css: string): string {
//   return css;
// }

function getVariables(css: string): Record<string, string> {
  const variables: Record<string, string> = {};

  const roots = getRoots(css);

  const varStrings = roots
    .join(`;`)
    .split(`;`)
    .filter((s) => s);
  const varArrs = varStrings.map((s) => s.split(`:`).map((s) => s.trim()));
  for (const [name, value] of varArrs) {
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
      css = css.replaceAll(exp, `${result.toFixed(3)}${unit}`);
    }
  }

  return css;
}

function minifySyntax(css: string): string {
  return css.replaceAll(`\n`, ` `).replaceAll(`: `, `:`).trim();
}
