import { useState, useSyncExternalStore } from "react";
import { useConst } from "wdwh/hooks";

type Listener = () => void;

export type Signal<T> = {
  get(): T;
  set(newValueOrFn: T | ((prev: T) => T)): void;
  subscribe(listener: Listener): () => void;
  use(): T;
};

export function useCreateSignal<T>(defaultValue: T): Signal<T> {
  let value = defaultValue;
  const listeners = useConst(new Set<Listener>());

  function get() {
    return value;
  }

  function subscribe(listener: Listener) {
    listeners.add(listener);
    return () => listeners.delete(listener);
  }

  return {
    get,

    set(newValueOrFn) {
      const newValue =
        typeof newValueOrFn === "function" ? (newValueOrFn as (prev: T) => T)(value) : newValueOrFn;

      if (Object.is(value, newValue)) return;

      value = newValue;
      listeners.forEach((l) => l());
    },

    subscribe,

    use() {
      return useSyncExternalStore(subscribe, get);
    },
  };
}

export function deprecated_useSignal<T>(defaultValue: T, fn?: Void) {
  const [value, setValue] = useState(defaultValue);

  return {
    get() {
      return value;
    },

    set(newValue: T) {
      setValue(newValue);
      fn?.();
    },
  };
}
