import { useEffect, useRef } from "react";
import { Button } from "wdwh/components";
import { contextMenuSignal } from "../lib/consts";

export default function ContextMenu() {
  const ref = useRef<HTMLDivElement>(null);
  const contextMenu = contextMenuSignal.use();
  useEffect(() => {
    function handler({ target }: MouseEvent) {
      if (ref.current && target && !ref.current.contains(target as Node)) contextMenuSignal.set(null);
    }

    document.addEventListener(`mousedown`, handler);

    return () => document.removeEventListener(`mousedown`, handler);
  }, [ref]);

  return (
    <div
      ref={ref}
      className="border border-zinc-600 rounded-sm bg-zinc-950 flex flex-col"
      style={{
        top: `${contextMenu?.y || 0}px`,
        left: `${contextMenu?.x || 0}px`,
        display: contextMenu !== null ? `` : `none`,
      }}
    >
      {Object.entries(contextMenu || {}).map(([text, fn]) =>
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
  );
}
