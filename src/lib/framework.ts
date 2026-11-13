import { useSyncExternalStore } from "react";
import { useConst } from "./hooks";

export function createSignal<T>(defaultValue: T, fn?: Listener): Signal<T> {
  let value = defaultValue;
  const listeners = new Set<Listener>(fn ? [fn] : undefined);

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
        typeof newValueOrFn === `function` ? (newValueOrFn as (prev: T) => T)(value) : newValueOrFn;

      if (Object.is(value, newValue)) return;

      value = newValue;
      listeners.forEach((l) => l());
    },

    subscribe,

    use() {
      return useSyncExternalStore(subscribe, get, get);
    },
  };
}

export function useCreateSignal<T>(defaultValue: T, fn?: Listener): Signal<T> {
  return useConst(createSignal(defaultValue, fn));
}

type Listener = () => void;

export type Signal<T> = {
  get(): T;
  set(newValueOrFn: T | ((prev: T) => T)): void;
  subscribe(listener: Listener): () => void;
  use(): T;
};

// clsx for tailwind classes
export function clsx(...inputs: ClassValue[]) {
  let str = ``;
  for (const input of inputs) {
    if (!input) continue;
    if (typeof input === `string`) {
      str && (str += ` `);
      str += input;
    } else if (Array.isArray(input)) {
      str && (str += ` `);
      str += clsx(str);
    }
  }

  return str;
}

type ClassValue = ClassValue[] | string | number | null | boolean | undefined;
