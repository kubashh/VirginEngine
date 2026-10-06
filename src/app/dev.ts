import html from "./index.html";

Bun.serve({
  routes: {
    "/": html,
  },
});
