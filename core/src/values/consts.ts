import { Scene } from "./classes";

// Canvas
export const ctx: CanvasRenderingContext2D = (
  document.getElementById("REPLACE_CANVAS_ID") as HTMLCanvasElement
).getContext("2d")!;

// Files
export const files: Any = REPLACE_FILES;

// Alphabet
export const alphabet = `ABCDEFGHIJKLMNOPRQSTUWXYZ`;
export const numbers = `0123456789`;
export const allowedNameChars = `${alphabet}${numbers}_`;

// Events
export const events: TObj<boolean> = {};
export const eventsHover: TObj<boolean> = {};

// Nodes
export const nodes: TNode[] = [];

// Log
export const Log = { updates: 0, frames: 0, framesTemp: 0 };

export const Camera = {
  xOffset: 0,
  yOffset: 0,
};

export const scene: TScene = new Scene({ name: `` });
