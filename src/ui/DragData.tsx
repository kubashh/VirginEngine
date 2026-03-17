import { useEffect } from "react";
import { createSignal } from "wdwh/signal";
import { dragDataSignal } from "../lib/consts";

const mouseSignal = createSignal<{ left: number; top: number } | null>(null); // null

export default function DragData() {
  const dragData = dragDataSignal.use();
  const mouse = mouseSignal.use();

  useEffect(() => {
    if (!dragData.name) return;

    window.addEventListener(`mousemove`, handleMouseMove);
    window.addEventListener(`mouseup`, handleMouseUp);

    return () => {
      window.removeEventListener(`mousemove`, handleMouseMove);
      window.removeEventListener(`mouseup`, handleMouseUp);
    };
  });

  return mouse ? (
    <div className="absolute z-1 bg-[#000a]" style={mouse}>
      {dragData.name}
    </div>
  ) : null;
}

function handleMouseMove({ clientX, clientY, buttons }: MouseEvent) {
  if (buttons !== 1) return;
  console.log(`Render`);
  mouseSignal.set({ left: clientX + 3, top: clientY + 3 });
}

function handleMouseUp() {
  dragDataSignal.set({ name: ``, from: ``, file: {}, old: {} });
  mouseSignal.set(null);
}
