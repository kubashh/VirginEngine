import { importJoinFiles } from "../fn/joinAndImport"

export const staticFiles = await importJoinFiles(
  // Values
  await import("./values/canvas.j"),
  await import("./values/events.j"),

  // Components
  await import("./components/GameObject.j"),
  await import("./components/Transform.j"),
  await import("./components/Collider.j"),
  await import("./components/Physics.j"),
  await import("./components/Sprite.j"),
  await import("./components/Animation.j"),

  // Functions
  await import("./functions/basicFunctions.j"),
  await import("./functions/start.j"),
  await import("./functions/update.j"),
  await import("./functions/render.j"),
  await import("./functions/run.j")
)
