export class Timer {
  static timers: Timer[] = [];

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

  measure(obj: TObj<() => void>) {
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
