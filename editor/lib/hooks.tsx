import { useState } from "react";
import { useCreateSignal, type Signal } from "./signal";

export function useRefresh() {
  const f = useState(false)[1];
  return () => f((prev) => !prev);
}

export function useConst<T>(value: T) {
  return useState(value)[0];
}

export function useArrow(main = false, haveChilds = true, src?: string): ArrowSignal {
  const openSignal = useCreateSignal(main);

  const component = src ? (
    <img className="max-h-6 w-6 p-0.5" src={src} />
  ) : haveChilds ? (
    <button
      className="h-6 w-6 justify-self-center rounded-full text-center hover:text-zinc-400"
      style={{ transform: `rotate(${openSignal.get() ? 90 : 0}deg)` }}
      onClick={() => openSignal.set(!openSignal.get())}
    >{`>`}</button>
  ) : (
    <div className="h-6 w-6" />
  );

  return {
    ...openSignal,
    component,
  };
}

export type ArrowSignal = Signal<boolean> & { component: React.ReactNode };
