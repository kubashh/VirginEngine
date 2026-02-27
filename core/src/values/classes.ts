import Node from "../components/Node";
import { events, eventsHover, nodes } from "./consts";
import { deepCopy, onresize } from "../util/basicFunctions";

export class Scene extends Node implements TScene {
  // loaded = new Map<number, boolean>() // TODO key: id; if loaded.size === 0 run scene
  camera = { x: 0, y: 0 };

  // Time
  ms = 1;
  private vtime = 1;
  lastTime = 0;

  constructor({ name, ...scene }: SceneProps) {
    super(scene as any, name);
    this.time = 1;
  }

  load(newScene: SceneProps) {
    onresize();

    this.close();

    newScene = new Scene(deepCopy(newScene));

    for (const key in newScene) {
      (this as TScene)[key] = newScene[key];
    }

    for (const node of nodes) node.start?.();

    // Remove Scene from nodes
    nodes.shift();
  }

  private close() {
    super.destroy();

    nodes.length = 0;

    events.clear();
    eventsHover.clear();

    // Clear scene
    for (const key in this) delete this[key];
  }

  get time() {
    return this.vtime;
  }
  set time(newTime: number) {
    this.vtime = newTime;
    this.ms = 1000 / (60 * this.vtime);
    this.lastTime = performance.now();
  }
}

export class Timer {
  static timers = [] as Timer[];

  static reset() {
    for (const timer of this.timers) timer.reset();
  }

  private timers;
  allFormatted = [] as string[];

  constructor(...labels: string[]) {
    this.timers = labels.reduce((prev, str) => ({ ...prev, [str]: 0 }), {} as TObj<number>);
    this.reset();
    Timer.timers.push(this);
  }

  measure(obj: TObj<Void>) {
    const timer = this.timers;

    for (const [name, f] of Object.entries(obj)) {
      const start = performance.now();
      f();
      const end = performance.now() - start;
      if (!this.timers[name]) this.timers[name] = 0;
      timer[name] += end;
    }
  }

  reset() {
    const obj = Object.entries(this.timers).reduce(
      (prev, [key, v]) => ({ ...prev, [key]: (prev[key] || 0) + v }),
      {} as TObj<number>,
    );

    const all = Object.values(obj).reduce((prev, v) => prev + v, 0);
    this.allFormatted = Object.entries(obj).map(
      ([key, value]) => `${key}: ${((value * 100) / all || 0).toFixed(2)}%`,
    );

    this.timers = {};
  }
}

export class Obj {
  constructor(obj?: Object) {
    Object.assign(this, obj);
  }

  clear() {
    for (const key in this) delete this[key];
  }
}
