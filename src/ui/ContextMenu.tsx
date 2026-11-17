import { useEffect, useRef } from "react";
import { createSignal } from "../lib/framework";

const contextMenuSignal = createSignal<{
  [key: string]: (() => void) | number | false;
  x: number;
  y: number;
} | null>(null);

export function setContextMenu(
  props: {
    [key: string]: (() => void) | number | false;
    x: number;
    y: number;
  } | null,
) {
  contextMenuSignal.set(props);
}

export function ContextMenu() {
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
      className="flex flex-col rounded-sm border border-zinc-600 bg-zinc-950"
      style={{
        top: `${contextMenu?.y || 0}px`,
        left: `${contextMenu?.x || 0}px`,
        display: contextMenu !== null ? `` : `none`,
      }}
    >
      {Object.entries(contextMenu || {}).map(([text, fn]) =>
        typeof fn === `function` ? (
          <button
            key={text}
            className="px-4 text-left hover:bg-zinc-800"
            onClick={() => {
              fn();
              contextMenuSignal.set(null);
            }}
          >
            {text}
          </button>
        ) : null,
      )}
    </div>
  );
}
