import { useEffect, useRef } from "react";
import { Button } from "wdwh/components";
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
      className="border-4 border-zinc-800 px-2 py-0.5 flex flex-col rounded-sm bg-black [&>*:not(:last-child)]:border-b"
      style={{ top: `${contextMenu[1]}px`, left: `${contextMenu[0]}px` }}
    >
      {contextMenu.slice(2).map(([fn, text, show = true]: any) =>
        show ? (
          <Button
            key={text}
            label={text}
            className="border-zinc-400 hover:text-zinc-400"
            onClick={() => {
              fn();
              contextMenuSignal.set([]);
            }}
          />
        ) : null,
      )}
    </div>
  ) : null;
}
