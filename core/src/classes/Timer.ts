import { drawText } from "../util/basicFunctions";
import { Log, nodes, performanceInfo } from "../values/consts";

export class Timer {
  static timers: Timer[] = [];

  // @ts-ignore
  static renderTimer: Timer = performanceInfo && new Timer([`Sprite`, `Text`, `Nodes`]);
  // @ts-ignore
  static updateTimer: Timer = performanceInfo && new Timer([`Physics`, `Nodes`]);

  static reset() {
    for (const timer of this.timers) timer.reset();
  }

  static renderPerformanceInfo() {
    const props = {
      x: 6,
      y: 6,
      h: 16,
      rect: { x: -1, y: -1 },
      color: `white`,
      textAlign: `left`,
      textBaseline: `top`,
    };

    drawText({
      ...props,
      text: `${nodes.length}obj, ${Log.updates}ups, ${Log.frames}fps`,
      x: -6,
      rect: { x: 1, y: -1 },
      textAlign: `right`,
    });

    for (const text of Timer.renderTimer.allFormatted) {
      drawText({ text, ...props });
      props.y += 18;
    }

    props.x = 148;
    props.y = 6;

    for (const text of Timer.updateTimer.allFormatted) {
      drawText({ text, ...props });
      props.y += 18;
    }
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
      const end = performance.now();
      if (!this.timers[name]) this.timers[name] = 0;
      timer[name] += end - start;
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
