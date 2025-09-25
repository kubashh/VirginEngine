import { buildCore } from "../core/main"
import index from "./app/index.html"

await buildCore()

const server = Bun.serve({
  routes: { "/*": index },
  development: process.env.NODE_ENV !== "production" && { hmr: true },
})

console.log(`> Server running at ${server.url}`)
