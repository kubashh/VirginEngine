import { performanceInfo } from "../values/consts";

export class Timer {
  static timers: Timer[] = [];

  // @ts-ignore
  static renderTimer: Timer = performanceInfo && new Timer([`Sprite`, `Text`, `Nodes`]);
  // @ts-ignore
  static updateTimer: Timer = performanceInfo && new Timer([`Physics`, `Nodes`]);

  static reset() {
    for (const timer of this.timers) timer.reset();
  }

  private timers: TObj<number>;
  allFormatted: string[] = [];

  constructor(labels: string[]) {
    this.timers = labels.reduce((prev, label) => ({ ...prev, [label]: 0 }), {});
    this.reset();
    Timer.timers.push(this);
  }

  measure(obj: TObj<() => void>) {
    const timer = this.timers;

    for (const name in obj) {
      const start = performance.now();
      obj[name]();
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
