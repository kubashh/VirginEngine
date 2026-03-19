import { useConst, useRefresh } from "wdwh/hooks";

class Signal<T> {
  private v: T;
  refresh: Void = () => {
    throw Error(`Refresh not bind!`);
  };

  constructor(v: T) {
    this.v = v;
  }

  bind(fn?: Void) {
    if (fn) {
      const refresh = useRefresh();
      this.refresh = () => {
        fn();
        refresh();
      };
    } else this.refresh = useRefresh();
  }

  get value() {
    return this.v;
  }
  set value(v: T) {
    this.v = v;
    this.refresh?.();
  }
}

export function deprecated_useSignal<T>(v: T, f?: Void) {
  const sig = useConst(new Signal(v));
  sig.bind(f);
  return sig;
}
