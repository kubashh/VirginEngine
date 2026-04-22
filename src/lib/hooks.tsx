import { useCreateSignal, type Signal } from "wdwh";

export function useArrow(
  main = false,
  haveChilds = true,
  src?: string,
): Signal<boolean> & { component: React.ReactNode } {
  const openSignal = useCreateSignal(main);

  const component = src ? (
    <img className="w-6 max-h-6 p-0.5" src={src} />
  ) : haveChilds ? (
    <div
      className="w-6 h-6 text-center justify-self-center rounded-full cursor-pointer hover:text-zinc-400"
      style={{ transform: `rotate(${openSignal.get() ? 90 : 0}deg)` }}
      onClick={() => openSignal.set(!openSignal.get())}
      children=">"
    />
  ) : (
    <div className="w-6 h-6" />
  );

  return {
    ...openSignal,
    component,
  };
}
