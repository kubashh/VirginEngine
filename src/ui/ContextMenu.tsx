import { useEffect, useRef } from "react";
import { contextMenuSignal } from "../lib/consts";

export default function ContextMenu() {
  const ref = useRef<HTMLDivElement>(null);
  const contextMenu = contextMenuSignal.use();

  useEffect(() => {
    function handler({ target }: { target: any }) {
      if (ref.current && !ref.current.contains(target)) contextMenuSignal.set([]);
    }

    document.addEventListener(`mousedown`, handler);

    return () => document.removeEventListener(`mousedown`, handler);
  }, [ref]);

  return contextMenu.length > 2 ? (
    <div
      ref={ref}
      className="absolute z-1 border-4 border-zinc-800 px-2 py-0.5 bg-black"
      style={{ inset: `${contextMenu[1]}px auto auto ${contextMenu[0]}px` }}
    >
      {contextMenu.slice(2).map(([fn, text, show = true]: any) =>
        show ? (
          <div
            className="cursor-pointer hover:text-zinc-400"
            key={text}
            onClick={() => {
              fn();
              contextMenuSignal.set([]);
            }}
            children={text}
          />
        ) : null,
      )}
    </div>
  ) : null;
}
