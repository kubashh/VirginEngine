import { importFile, joinFiles } from "../fn/joinAndImport"

export const components = joinFiles(
  await importFile(await import("./components/GameObject.j")),
  await importFile(await import("./components/Transform.j")),
  await importFile(await import("./components/Collider.j")),
  await importFile(await import("./components/Physics.j")),
  await importFile(await import("./components/Sprite.j")),
  await importFile(await import("./components/Animation.j"))
)