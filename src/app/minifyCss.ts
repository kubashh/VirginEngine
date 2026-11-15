// returns preexecuted css
export function minifyCss(css: string): string {
  css = inlineVariables(css);
  // css = removeUnusedVariables(css);
  css = exeCalc(css);

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
  const declarations: Record<string, string> = {};

  let startDec = css.indexOf(`{`, css.indexOf(`:root`)) + 1;
  if (startDec < 0) startDec = css.indexOf(`{`, css.indexOf(`:host`)) + 1;
  const decSlice = css.slice(startDec, css.indexOf(`}`, startDec)).trim();

  const decStrings = decSlice.split(`;`).slice(0, -1);
  const decArrs = decStrings.map((s) => s.split(`:`).map((s) => s.trim()));
  for (const [name, value] of decArrs) {
    declarations[name] = value;
  }

  return declarations;
}

function exeCalc(css: string): string {
  const calcExpressions = new Set<string>();

  let index = css.indexOf(`calc(`);
  while (index >= 0) {
    calcExpressions.add(css.slice(index, css.indexOf(`)`, index) + 1));
    index = css.indexOf(`calc(`, index + 6);
  }

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

    if (result === 0) unit = ``;

    if (typeof result === `number` && !Number.isNaN(result)) {
      css = css.replaceAll(exp, `${result.toFixed(3)}${unit}`);
    }
  }

  return css;
}
