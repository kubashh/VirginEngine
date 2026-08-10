import { useEffect, useRef } from "react";
import { Button } from "wdwh/components";
import { contextMenuSignal } from "../lib/consts";

export default function ContextMenu() {
  const ref = useRef<HTMLDivElement>(null);
  const contextMenu = contextMenuSignal.use();
  useEffect(() => {
    function handler({ target }: { target: any }) {
      if (ref.current && !ref.current.contains(target)) contextMenuSignal.set(null);
    }

    document.addEventListener(`mousedown`, handler);

    return () => document.removeEventListener(`mousedown`, handler);
  }, [ref]);

  return contextMenu !== null ? (
    <div
      ref={ref}
      className="border border-zinc-600 rounded-sm bg-zinc-950 flex flex-col"
      style={{ top: `${contextMenu.y}px`, left: `${contextMenu.x}px` }}
    >
      {Object.entries(contextMenu).map(([text, fn]) =>
        typeof fn === `function` ? (
          <Button
            key={text}
            label={text}
            className="px-4 text-left hover:bg-zinc-800"
            onClick={() => {
              fn();
              contextMenuSignal.set(null);
            }}
          />
        ) : null,
      )}
    </div>
  ) : null;
}
