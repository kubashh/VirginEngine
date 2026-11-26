import fs from "fs";
import { version as virginEngineVersion } from "../../package.json";
import { buildCoreBuild } from "../../build/buildCoreBuild/buildCoreBuild";
import { buildEditor } from "../../build/buildEditor/buildEditor";

await Bun.$`bun check build core editor`;
await Bun.$`bun fmt build core editor package.json`;
await buildCoreBuild();
await updateVEVersionHtml();

if (process.argv.includes(`--dev`)) {
  await dev();
} else if (process.argv.includes(`--build`)) {
  await buildEditor();
}

async function updateVEVersionHtml() {
  const htmlFile = Bun.file(`./editor/app/index.html`);
  let htmlText = await htmlFile.text();

  htmlText = htmlText.replace(
    /<title>.*?<\/title>/i,
    `<title>VirginEngine v${virginEngineVersion}</title>`,
  );

  await Bun.write(`./editor/app/indexUpdated.html`, htmlText);
}

async function dev() {
  const html = await import("./indexUpdated.html");

  fs.watch(`core`, { recursive: true }, async () => {
    await Bun.$`bun fmt core`;
    await buildCoreBuild();
  });

  Bun.serve({
    routes: {
      "/": html.default,
    },
    development: { hmr: true },
  });
}
