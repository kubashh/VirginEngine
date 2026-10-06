const bracketColor = `yellow`;
const statementColor = `pink`;
const keywordColor = `#2197ea`;
const typeColor = `#78E29C`;
const stringColor = `brown`;
const commentColor = `#419B45`;

const bracketsRegex = /\(|\)|\[|\]|\{|\}|\<|\>/g;
const stringsRegex = /('[^']*')|("[^"]*")|(`[^`]*`)/g;
const statementsRegex =
  /\b(await|break|case|catch|continue|default|do|else|export|for|if|return|switch|throw|try|type|while|yield)(\b|\;)/g;
const keywordsReqex =
  /\b(class|const|debugger|delete|extends|function|let|new|this|var|yield|undefined|null)(\b|\;)/g;
const typesRegex = /boolean|number|bigint|string|void|never|Promise/g;

const mdStylesPlugin: Bun.BunPlugin = {
  name: `markdown-loader`,

  setup(build) {
    build.onLoad({ filter: /\.md$/ }, async ({ path }) => {
      let md = await Bun.file(path).text();
      md = Bun.markdown.html(md);
      md = addHtmlScriptStyles(md);

      return {
        contents: `
          export default ${JSON.stringify(md)};
        `,
        loader: `js`,
      };
    });
  },
};

function addHtmlScriptStyles(html: string) {
  const lines: string[] = [];

  for (let i = 0; i < html.length; i++) {
    if (html.indexOf(`<pre><code class="language-ts">`, i) === i) {
      const end = html.indexOf(`</code></pre>`, i) + `</code></pre>`.length;
      const codeToStyle = html.slice(i, end);
      lines.push(styleCode(codeToStyle));
      i += codeToStyle.length - 1;
    } else {
      lines.push(html[i]);
    }
  }

  return lines.join(``);
}

function styleCode(html: string) {
  const code = html.slice(`<pre><code class="language-ts">`.length, -`</code></pre>`.length);

  const lines = code.split(`\n`).map((line) => {
    // brackets & strings must be compigned because of parsing html tags
    line = line.replaceAll(
      new RegExp(`(${bracketsRegex.source})|(${stringsRegex.source})`, `g`),
      (bracketOrString) =>
        addColor(
          bracketOrString,
          bracketOrString[0] === `'` || bracketOrString[0] === `"` || bracketOrString[0] === "`"
            ? stringColor
            : bracketColor,
        ),
    );

    // statements & keywords
    line = line.replaceAll(statementsRegex, (statement) => addColor(statement, statementColor));
    line = line.replaceAll(keywordsReqex, (keyword) => addColor(keyword, keywordColor));

    // types
    line = line.replaceAll(typesRegex, (type) => addColor(type, typeColor));

    const lineCommentIndex = line.indexOf(`//`);
    return lineCommentIndex >= 0 ? addColor(line, commentColor, lineCommentIndex) : line;
  });

  return [`<pre><code class="language-ts">`, lines.join(`\n`), `</code></pre>`].join(``);
}

function addColor(str: string, color: string, spliceIndex = 0) {
  return `${str.slice(0, spliceIndex)}<span style="color:${color};">${str.slice(spliceIndex)}</span>`;
}

export default mdStylesPlugin;
