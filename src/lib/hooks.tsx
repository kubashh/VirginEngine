import { useCreateSignal, type Signal } from "wdwh";
import { Button } from "wdwh/components";

export function useArrow(main = false, haveChilds = true, src?: string): Arrow {
  const openSignal = useCreateSignal(main);

  const component = src ? (
    <img className="w-6 max-h-6 p-0.5" src={src} />
  ) : haveChilds ? (
    <Button
      label=">"
      className="w-6 h-6 text-center justify-self-center rounded-full hover:text-zinc-400"
      style={{ transform: `rotate(${openSignal.get() ? 90 : 0}deg)` }}
      onClick={() => openSignal.set(!openSignal.get())}
    />
  ) : (
    <div className="w-6 h-6" />
  );

  return {
    ...openSignal,
    component,
  };
}

type Arrow = Signal<boolean> & { component: React.ReactNode };
