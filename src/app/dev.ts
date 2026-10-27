import fs from "fs";
import html from "./index.html";

fs.watch(`core`, { recursive: true }, async () => {
  await Bun.$`bun core/buildBuild.ts`;
});

Bun.serve({
  routes: {
    "/": html,
  },
  development: { hmr: true },
});
