import Node from "../components/Node";
import { events, eventsHover, nodes } from "./consts";
import { clearObject, deepCopy, onresize } from "../util/basicFunctions";

export class Scene implements TScene {
  // loaded = new Map<number, boolean>() // TODO key: id; if loaded.size === 0 run scene
  root: TNode;

  camera = { x: 0, y: 0 }; // On change update root pos = update all pos + shaking + resize

  // Time
  msdiv = 1;
  private vtime = 1;
  lastTime = 0;

  constructor({ name, ...scene }: SceneProps) {
    this.root = new Node({ ...scene, parent: {} as TNode } as any, name);
    this.time = 1;
  }

  load(props: SceneProps) {
    onresize();
    this.close();

    // Reset scene
    this.camera = { x: 0, y: 0 };
    this.time = 1;

    const newScene: TScene = new Scene(deepCopy(props));

    // Object.assign(this, newScene); // maybe later, need copy class methods
    for (const key in newScene) {
      (this as TScene)[key] = newScene[key];
    }

    for (const node of nodes) node.start?.();

    // Remove root node from nodes
    nodes.shift();
  }

  private close() {
    this.root.destroy();

    nodes.length = 0;

    clearObject(events);
    clearObject(eventsHover);

    // // Clear scene --- this breaks loading scenes!!!
    // for (const key in this) {
    //   console.log(key);
    //   delete this[key];
    // }
  }

  get time() {
    return this.vtime;
  }
  set time(newTime: number) {
    this.vtime = newTime;
    const ms = 1000 / (60 * this.vtime);
    this.msdiv = 1 / ms;
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
