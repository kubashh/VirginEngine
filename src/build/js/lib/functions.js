import { importFile, joinFiles } from "../fn/joinAndImport"

export const functions = joinFiles(
  await importFile(await import("./functions/basicFunctions.j")),
  await importFile(await import("./functions/start.j")),
  await importFile(await import("./functions/update.j")),
  await importFile(await import("./functions/render.j")),
  await importFile(await import("./functions/run.j"))
)
