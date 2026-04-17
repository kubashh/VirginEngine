import { useState } from "react";

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
