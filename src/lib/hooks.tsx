import { type Signal, useSignal } from "wdwh/signal"

export function useArrow(
  main = false,
  haveChilds = true,
  src?: string,
): [React.ReactNode, Signal<boolean>] {
  const open = useSignal(main)

  if (src) return [<img className="w-6 max-h-6 p-0.5" src={src} />, open]

  if (!haveChilds) return [<div className="w-6 h-6" />, open]

  return [
    <div
      className="w-6 h-6 text-center justify-self-center rounded-full cursor-pointer hover:text-zinc-400"
      style={{ transform: `rotate(${open.value ? 90 : 0}deg)` }}
      onClick={() => (open.value = !open.value)}
      children=">"
    />,
    open,
  ]
}
