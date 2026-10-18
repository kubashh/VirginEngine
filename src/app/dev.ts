import fs from "fs";
import path from "path";
import html from "./index.html";

fs.watch(path.join(import.meta.dir, `../../core`), { recursive: true }, async () => {
  await Bun.$`bun core/buildBuild.ts`;
});

Bun.serve({
  routes: {
    "/": html,
  },
  development: { hmr: true },
});
