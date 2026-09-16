import { Scene } from "./classes";

// canvas
// @ts-ignore
export const ctx: CanvasRenderingContext2D = document.getElementById(`REPLACE_CANVAS_ID`).getContext(`2d`);

// files
export const files: TObj<any> = REPLACE_FILES;

// events
export const events: TObj<boolean> = {};
export const eventsHover: TObj<boolean> = {};

// nodes
export const nodes: TNode[] = [];

// log
// every thing when performanceInfo is used will be removed in comptime via terser.
// ts-ignore is needed for "unused" objects and it will look strange but we make it for less bundle size.
export const performanceInfo = REPLACE_PERFORMANCE_INFO;
// @ts-ignore
export const Log: TLog = performanceInfo && { updates: 0, frames: 0, framesTemp: 0 };

export const Camera = {
  xOffset: 0,
  yOffset: 0,
};

export const scene: TScene = new Scene({ name: `` });

// types
type TLog = { updates: number; frames: number; framesTemp: number };
